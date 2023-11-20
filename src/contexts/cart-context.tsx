'use client'

import { ReactNode, createContext, useContext, useState } from 'react'

interface CardItem {
    productId: number
    quantity: number
}

interface CartContextType {
    items: CardItem[]
    addToCart: (productId: number) => void
}

const CartContext = createContext({} as CartContextType)

export function CartProvider({ children }: { children: ReactNode }) {
    const [cardItems, setCardItems] = useState<CardItem[]>([])
    
    function addToCart(productId: number) {
        setCardItems(state => {
            const productInCart = state.some((item) => item.productId === productId)
        
            if (productInCart) {
                return state.map(item => {
                    if (item.productId === productId) {
                        return { ...item, quantity: item.quantity + 1 }
                    } else {
                        return item
                    }
                })
            } else {
                return [...state, { productId, quantity: 1 }]
            }
        
        })
    }

    return (
        <CartContext.Provider value={{ items: cardItems, addToCart }}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => useContext(CartContext)