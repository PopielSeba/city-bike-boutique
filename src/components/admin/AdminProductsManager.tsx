import { useMemo, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";

interface ProductRow {
  id: string;
  name: string;
  description: string | null;
  price_cents: number;
  currency: string;
  image_url: string | null;
  stock: number;
  published: boolean;
  created_at: string;
  updated_at: string;
}

const toPLN = (price_cents: number) =>
  new Intl.NumberFormat("pl-PL", { style: "currency", currency: "PLN" }).format(
    (price_cents || 0) / 100
  );

export default function AdminProductsManager() {
  const qc = useQueryClient();

  const { data: products, isLoading } = useQuery({
    queryKey: ["products", "admin"],
    queryFn: async (): Promise<ProductRow[]> => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as ProductRow[];
    },
  });

  const invalidate = () => qc.invalidateQueries({ queryKey: ["products", "admin"] });

  const createMutation = useMutation({
    mutationFn: async (payload: Omit<ProductRow, "id" | "created_at" | "updated_at">) => {
      const { error } = await supabase.from("products").insert(payload as any);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Produkt dodany");
      invalidate();
    },
    onError: (e: any) => toast.error(e.message || "Błąd podczas dodawania"),
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<ProductRow> }) => {
      const { error } = await supabase.from("products").update(data).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Zapisano zmiany");
      invalidate();
    },
    onError: (e: any) => toast.error(e.message || "Błąd podczas zapisu"),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("products").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Usunięto produkt");
      invalidate();
    },
    onError: (e: any) => toast.error(e.message || "Błąd podczas usuwania"),
  });

  const togglePublished = async (row: ProductRow) => {
    await updateMutation.mutateAsync({ id: row.id, data: { published: !row.published } });
  };

  // Dialog state
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    description: "",
    pricePLN: "",
    image_url: "",
    stock: 0,
    published: false,
  });

  const isEditing = useMemo(() => Boolean(editingId), [editingId]);

  const resetForm = () => {
    setEditingId(null);
    setForm({ name: "", description: "", pricePLN: "", image_url: "", stock: 0, published: false });
  };

  const openCreate = () => {
    resetForm();
    setOpen(true);
  };

  const openEdit = (row: ProductRow) => {
    setEditingId(row.id);
    setForm({
      name: row.name,
      description: row.description || "",
      pricePLN: ((row.price_cents || 0) / 100).toString(),
      image_url: row.image_url || "",
      stock: row.stock,
      published: row.published,
    });
    setOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const price_cents = Math.max(0, Math.round(parseFloat(form.pricePLN || "0") * 100));
    const payload = {
      name: form.name.trim(),
      description: form.description.trim() || null,
      price_cents,
      currency: "PLN",
      image_url: form.image_url.trim() || null,
      stock: Number.isFinite(form.stock) ? Math.max(0, form.stock) : 0,
      published: Boolean(form.published),
    } as Omit<ProductRow, "id" | "created_at" | "updated_at">;

    if (!payload.name) return toast.error("Nazwa jest wymagana");

    if (isEditing && editingId) {
      await updateMutation.mutateAsync({ id: editingId, data: payload });
    } else {
      await createMutation.mutateAsync(payload);
    }

    setOpen(false);
    resetForm();
  };

  return (
    <section className="space-y-4" aria-label="Zarządzanie produktami">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-2xl font-semibold text-foreground">Produkty</h2>
        <Button onClick={openCreate}>Dodaj produkt</Button>
      </div>

      {isLoading ? (
        <p className="text-muted-foreground">Ładowanie…</p>
      ) : !products || products.length === 0 ? (
        <p className="text-muted-foreground">Brak produktów.</p>
      ) : (
        <div className="rounded-md border border-border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nazwa</TableHead>
                <TableHead>Cena</TableHead>
                <TableHead>Stan</TableHead>
                <TableHead>Opublikowany</TableHead>
                <TableHead className="text-right">Akcje</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="font-medium">{p.name}</TableCell>
                  <TableCell>{toPLN(p.price_cents)}</TableCell>
                  <TableCell>{p.stock}</TableCell>
                  <TableCell>
                    <span className="text-sm text-muted-foreground">
                      {p.published ? "Tak" : "Nie"}
                    </span>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="outline" size="sm" onClick={() => openEdit(p)}>
                      Edytuj
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => togglePublished(p)}
                      disabled={updateMutation.isPending}
                    >
                      {p.published ? "Wyłącz" : "Publikuj"}
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={async () => {
                        if (confirm("Na pewno usunąć produkt?")) await deleteMutation.mutateAsync(p.id);
                      }}
                      disabled={deleteMutation.isPending}
                    >
                      Usuń
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isEditing ? "Edytuj produkt" : "Dodaj produkt"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nazwa</Label>
              <Input
                id="name"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Opis</Label>
              <Textarea
                id="description"
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="price">Cena (PLN)</Label>
              <Input
                id="price"
                type="number"
                inputMode="decimal"
                step="0.01"
                min="0"
                value={form.pricePLN}
                onChange={(e) => setForm((f) => ({ ...f, pricePLN: e.target.value }))}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="image_url">URL zdjęcia</Label>
              <Input
                id="image_url"
                value={form.image_url}
                onChange={(e) => setForm((f) => ({ ...f, image_url: e.target.value }))}
                placeholder="https://…"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="stock">Stan magazynowy</Label>
              <Input
                id="stock"
                type="number"
                min="0"
                value={form.stock}
                onChange={(e) => setForm((f) => ({ ...f, stock: Number(e.target.value) || 0 }))}
                required
              />
            </div>
            <div className="flex items-center justify-between rounded-md border border-border p-3">
              <div>
                <Label htmlFor="published">Opublikowany</Label>
              </div>
              <Switch
                id="published"
                checked={form.published}
                onCheckedChange={(v) => setForm((f) => ({ ...f, published: v }))}
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Anuluj
              </Button>
              <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                {isEditing ? "Zapisz" : "Dodaj"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
}
