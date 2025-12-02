import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Product, CartItem } from 'types';
import { useAuth } from 'hooks/useAuth';
import { storageService } from 'services/storageService';
import { apiService } from 'services/apiService';


// 1. Definir la forma del Contexto
interface CartContextType {
    cartItems: CartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (codigo: string) => void;
    clearCart: () => void;
    getItemCount: () => number;
    getTotal: () => number;
    getDiscountedTotal: () => number;
    isCartOpen: boolean;
    openCart: () => void;
    closeCart: () => void;
}

// 2. Crear el Contexto
const CartContext = createContext<CartContextType | undefined>(undefined);

// 3. Crear el Proveedor
interface CartProviderProps {
    children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const { user } = useAuth();

    // Function to fetch cart from backend
    const fetchCart = async () => {
        if (user) {
            try {
                const response = await apiService.get('/cart');
                setCartItems(response.data as CartItem[]);
            } catch (error) {
                console.error('Error fetching cart from backend:', error);
                setCartItems([]);
            }
        } else {
            // For guest users, load from localStorage
            setCartItems(storageService.local.get<CartItem[]>('cart') || []);
        }
    };

    // Effect to load cart on component mount or user change
    useEffect(() => {
        fetchCart();
    }, [user]);

    // --- Funciones del Carrito ---

    const addToCart = async (product: Product) => {
        try {
            if (user) {
                // --- CORRECCIÓN APLICADA AQUÍ ---
                await apiService.post('/cart/add', { 
                    productCodigo: product.codigo, // <--- Clave correcta
                    quantity: 1 
                });
                await fetchCart();
            } else {
                setCartItems(prevItems => {
                    const existingItem = prevItems.find(item => item.product.codigo === product.codigo);
                    let newItems;
                    if (existingItem) {
                        newItems = prevItems.map(item =>
                            item.product.codigo === product.codigo
                                ? { ...item, quantity: item.quantity + 1 }
                                : item
                        );
                    } else {
                        newItems = [...prevItems, { product: product, quantity: 1 }];
                    }
                    storageService.local.set('cart', newItems); // Guardamos newItems, no cartItems (estado anterior)
                    return newItems;
                });
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    };

    const removeFromCart = async (codigo: string) => {
        try {
            if (user) {
                // --- CORRECCIÓN APLICADA AQUÍ ---
                await apiService.post('/cart/remove', { 
                    productCodigo: codigo // <--- Clave correcta
                });
                await fetchCart();
            } else {
                setCartItems(prevItems => {
                    const newItems = prevItems.filter(item => item.product.codigo !== codigo);
                    storageService.local.set('cart', newItems);
                    return newItems;
                });
            }
        } catch (error) {
            console.error('Error removing from cart:', error);
        }
    };

    const clearCart = async () => {
        try {
            if (user) {
                await apiService.post('/cart/clear');
                setCartItems([]);
            } else {
                setCartItems([]);
                storageService.local.remove('cart');
            }
        } catch (error) {
            console.error('Error clearing cart:', error);
        }
    };

    const getItemCount = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    };

    const getTotal = () => {
        return cartItems.reduce((total, item) => total + (item.product.precio * item.quantity), 0);
    };

    const getDiscountedTotal = () => {
        const total = getTotal();
        if (user && user.email.endsWith('@duocuc.cl')) {
            return total * 0.8;
        }
        return total;
    };

    const openCart = () => setIsCartOpen(true);
    const closeCart = () => setIsCartOpen(false);

    const value = {
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        getItemCount,
        getTotal,
        getDiscountedTotal,
        isCartOpen,
        openCart,
        closeCart
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart debe ser usado dentro de un CartProvider');
    }
    return context;
};