-- Create products table with admin-managed permissions
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  price_cents integer not null check (price_cents >= 0),
  currency text not null default 'PLN',
  image_url text,
  stock integer not null default 0,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Enable RLS
alter table public.products enable row level security;

-- Helpful indexes
create index if not exists idx_products_published on public.products (published);
create index if not exists idx_products_created_at on public.products (created_at desc);

-- Clean up any existing policies (idempotent)
drop policy if exists "Anyone can view published products" on public.products;
drop policy if exists "Admins can view all products" on public.products;
drop policy if exists "Admins can insert products" on public.products;
drop policy if exists "Admins can update products" on public.products;
drop policy if exists "Admins can delete products" on public.products;

-- Public can view published products
create policy "Anyone can view published products"
on public.products
for select
using (published = true);

-- Admins can view everything
create policy "Admins can view all products"
on public.products
for select
to authenticated
using (public.has_role(auth.uid(), 'admin'));

-- Admin-only write access
create policy "Admins can insert products"
on public.products
for insert
to authenticated
with check (public.has_role(auth.uid(), 'admin'));

create policy "Admins can update products"
on public.products
for update
to authenticated
using (public.has_role(auth.uid(), 'admin'))
with check (public.has_role(auth.uid(), 'admin'));

create policy "Admins can delete products"
on public.products
for delete
to authenticated
using (public.has_role(auth.uid(), 'admin'));

-- Update updated_at automatically
drop trigger if exists update_products_updated_at on public.products;
create trigger update_products_updated_at
before update on public.products
for each row execute function public.update_updated_at_column();