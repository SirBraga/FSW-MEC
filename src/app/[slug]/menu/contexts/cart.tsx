'use client'
import { Product } from "@prisma/client"
import { createContext, useState } from "react"

interface CartProduct extends Pick<Product, 'id' | 'name' | 'price' | 'imageUrl'> {
    quantity: number
}

export interface ICartContext {
    isOpen: boolean
    products: CartProduct[]
    toggleCart: () => void
    addProduct: (product: CartProduct) => void
}

export const CartContext = createContext<ICartContext>({
    isOpen: false,
    products: [],
    toggleCart: () => {},
    addProduct: () => {},
})

export const CartProvider = ({children}: {children: React.ReactNode}) => {
    const [isOpen, setIsOpen] = useState(false)
    const [products, setProducts] = useState<CartProduct[]>([])

    const toggleCart = () => {
        setIsOpen(!isOpen)
    }

    const addProduct = (product: CartProduct) => {
        const productIsAlreadyOnTheCart = products.find((p) => p.id === product.id) 
        if (productIsAlreadyOnTheCart) {
            const newProducts = products.map((p) => {
                if (p.id === product.id) {
                    return {
                        ...p,
                        quantity: p.quantity + product.quantity
                    }
                }
                return p
            })
            setProducts(newProducts)
            return
        }
        setProducts([...products, product])
    }

    return (
        <CartContext.Provider 
        value={{
            isOpen,
            products,
            toggleCart,
            addProduct
            }}>
            {children}
        </CartContext.Provider>
    )
}