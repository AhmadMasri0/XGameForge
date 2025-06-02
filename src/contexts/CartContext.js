import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import api from "../api/axios";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const { isAuthenticated } = useAuth();
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const loadCart = async () => {
            if (isAuthenticated) {
                let existingCart;
                try {
                    const res = await api.get("/api/cart/checkcart");
                    existingCart = res.data.items;
                } catch (err) {
                    console.error("Failed to check cart:", err);
                }
                const guestCart = JSON.parse(localStorage.getItem("cart")) || [];
                if (existingCart?.length === 0) {
                    for (let item of guestCart) {
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
                    const res = await api.get("/api/cart");
                    setCartItems(res.data.items || []);
                } catch (err) {
                    console.error("Failed to fetch user cart:", err);
                }
            } else {
                const local = JSON.parse(localStorage.getItem("cart")) || [];
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

    const addToCart = async (product, quantity = 1) => {
        if (isAuthenticated) {
            try {
                const res = await api.post("/api/cart", {
                    productId: product._id,
                    quantity,
                });
                setCartItems(res.data.items);
            } catch (err) {
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

    const updateQuantity = async (productId, quantity) => {
        if (isAuthenticated) {
            try {
                const res = await api.put("/api/cart", { productId, quantity });
                setCartItems(res.data.items);
            } catch (err) {
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

    const removeFromCart = async (productId) => {
        if (isAuthenticated) {
            try {
                const res = await api.delete(`/api/cart/${productId}`);
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

export const useCart = () => useContext(CartContext);
