import React, { createContext, useContext, useEffect, useMemo, useReducer } from "react";

export type CartItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

type CartState = {
  items: CartItem[];
};

type Action =
  | { type: "ADD"; payload: Omit<CartItem, "quantity"> & { quantity?: number } }
  | { type: "REMOVE"; payload: { id: number } }
  | { type: "UPDATE_QTY"; payload: { id: number; quantity: number } }
  | { type: "CLEAR" };

const CartContext = createContext<{
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clear: () => void;
  totalCount: number;
  totalPrice: number;
} | null>(null);

const STORAGE_KEY = "app_cart_v1";

function reducer(state: CartState, action: Action): CartState {
  switch (action.type) {
    case "ADD": {
      const qty = action.payload.quantity ?? 1;
      const existing = state.items.find((i) => i.id === action.payload.id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === action.payload.id ? { ...i, quantity: i.quantity + qty } : i
          ),
        };
      }
      return {
        items: [
          ...state.items,
          {
            id: action.payload.id,
            name: action.payload.name,
            price: action.payload.price,
            image: action.payload.image,
            quantity: qty,
          },
        ],
      };
    }
    case "REMOVE": {
      return { items: state.items.filter((i) => i.id !== action.payload.id) };
    }
    case "UPDATE_QTY": {
      const q = Math.max(1, action.payload.quantity);
      return {
        items: state.items.map((i) => (i.id === action.payload.id ? { ...i, quantity: q } : i)),
      };
    }
    case "CLEAR":
      return { items: [] };
    default:
      return state;
  }
}

export const CartProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, { items: [] });

  // Load from storage once
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed: CartState = JSON.parse(raw);
        if (parsed && Array.isArray(parsed.items)) {
          dispatch({ type: "CLEAR" });
          // hydrate by adding each item to keep logic consistent
          parsed.items.forEach((it) =>
            dispatch({ type: "ADD", payload: { ...it, quantity: it.quantity } })
          );
        }
      }
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Persist to storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ items: state.items }));
    } catch {}
  }, [state.items]);

  const value = useMemo(() => {
    const totalCount = state.items.reduce((acc, i) => acc + i.quantity, 0);
    const totalPrice = state.items.reduce((acc, i) => acc + i.price * i.quantity, 0);
    return {
      items: state.items,
      addItem: (item: Omit<CartItem, "quantity">, quantity = 1) =>
        dispatch({ type: "ADD", payload: { ...item, quantity } }),
      removeItem: (id: number) => dispatch({ type: "REMOVE", payload: { id } }),
      updateQuantity: (id: number, quantity: number) =>
        dispatch({ type: "UPDATE_QTY", payload: { id, quantity } }),
      clear: () => dispatch({ type: "CLEAR" }),
      totalCount,
      totalPrice,
    };
  }, [state.items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
