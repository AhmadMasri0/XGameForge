import  {
    createContext, useContext,
    useState, useEffect, ReactNode,
} from "react";
import { useAuth } from "./AuthContext";
import api from "../api/axios";
import { CartItem, Product } from "../types/types";

interface CartContextType {
    cartItems: CartItem[];
    addToCart: (product: Product, quantity?: number) => Promise<void>;
    updateQuantity: (productId: string, quantity: number) => Promise<void>;
    removeFromCart: (productId: string) => Promise<void>;
    clearCart: () => Promise<void>;
}

interface CartProviderProps {
    children: ReactNode;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: CartProviderProps) => {
    const { isAuthenticated } = useAuth();
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    useEffect(() => {
        const loadCart = async () => {
            if (isAuthenticated) {
                let existingCart: CartItem[] = [];

                try {
                    const res = await api.get<{ items: CartItem[] }>("/api/cart/checkcart");
                    existingCart = res.data?.items;
                } catch (err) {
                    console.error("Failed to check cart:", err);
                }

                const guestCart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");

                if (!existingCart || existingCart.length === 0) {
                    for (const item of guestCart) {
                        try {
                            await api.post("/api/cart", {
                                productId: item.product._id,
                                quantity: item.quantity,
                            });
                        } catch (err) {
                            console.error("Failed to sync item:", item.product.name, err);
                        }
                    }
                }

                localStorage.removeItem("cart");

                try {
                    const res = await api.get<{ items: CartItem[] }>("/api/cart");
                    setCartItems(res.data.items || []);
                } catch (err) {
                    console.error("Failed to fetch user cart:", err);
                }
            } else {
                const local = JSON.parse(localStorage.getItem("cart") || "[]");
                setCartItems(local);
            }
        };

        loadCart();
    }, [isAuthenticated]);

    useEffect(() => {
        if (!isAuthenticated) {
            localStorage.setItem("cart", JSON.stringify(cartItems));
        }
    }, [cartItems, isAuthenticated]);

    const addToCart = async (product: Product, quantity = 1) => {
        if (isAuthenticated) {
            try {
                const res = await api.post<{ items: CartItem[] }>("/api/cart", {
                    productId: product._id,
                    quantity,
                });
                setCartItems(res.data.items);
            } catch (err: any) {
                console.error("Add to cart failed:", err);
                alert(err?.response?.data?.message || "Error adding item");
            }
        } else {
            setCartItems((prev) => {
                const existing = prev.find((item) => item.product._id === product._id);
                if (existing) {
                    return prev.map((item) =>
                        item.product._id === product._id
                            ? {
                                ...item,
                                quantity: Math.min(3, item.quantity + quantity),
                            }
                            : item
                    );
                } else {
                    return [...prev, { product: { ...product }, quantity }];
                }
            });
        }
    };

    const updateQuantity = async (productId: string, quantity: number) => {
        if (isAuthenticated) {
            try {
                const res = await api.put<{ items: CartItem[] }>("/api/cart", {
                    productId,
                    quantity,
                });
                setCartItems(res.data.items);
            } catch (err: any) {
                console.error("Update failed:", err);
                alert(err?.response?.data?.message || "Error updating quantity");
            }
        } else {
            setCartItems((prev) =>
                prev.map((item) =>
                    item.product._id === productId ? { ...item, quantity } : item
                )
            );
        }
    };

    const removeFromCart = async (productId: string) => {
        if (isAuthenticated) {
            try {
                const res = await api.delete<{ items: CartItem[] }>(`/api/cart/${productId}`);
                setCartItems(res.data.items);
            } catch (err) {
                console.error("Remove failed:", err);
            }
        } else {
            setCartItems((prev) => prev.filter((item) => item.product._id !== productId));
        }
    };

    const clearCart = async () => {
        if (isAuthenticated) {
            try {
                await api.delete("/api/cart");
                setCartItems([]);
            } catch (err) {
                console.error("Clear cart failed:", err);
            }
        } else {
            setCartItems([]);
        }
    };

    return (
        <CartContext.Provider
            value={{ cartItems, addToCart, updateQuantity, removeFromCart, clearCart }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = (): CartContextType => {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart must be used within a CartProvider");
    return context;
};
