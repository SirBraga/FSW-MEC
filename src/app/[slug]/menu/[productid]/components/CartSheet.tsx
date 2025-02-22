import React, { useContext } from 'react'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { CartContext } from '../../contexts/cart'

export default function CartSheet() {
    const { isOpen, toggleCart, products } = useContext(CartContext)

    return (
        <Sheet open={isOpen} onOpenChange={toggleCart}>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>

                    </SheetTitle>
                </SheetHeader>
                {products.map((product) => (
                    <div key={product.id}>
                        <h1>{product.name}</h1>
                        <p>{product.quantity}</p>
                        <p>{product.price}</p>
                    </div>
                ))}
            </SheetContent>
        </Sheet>
    )
}
