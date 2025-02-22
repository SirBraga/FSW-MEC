"use client"

import React, { useContext, useState } from 'react'
import { Prisma } from '@prisma/client'
import Image from 'next/image'
import { FormatCurrency } from '@/helpers/format-currency'
import { Button } from '@/components/ui/button'
import { ChefHatIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { CartContext } from '../../contexts/cart'
import CartSheet from './CartSheet'



interface ProductDetailsProps {
    product: Prisma.ProductGetPayload<{
        include: {
            restaurant: {
                select: {
                    name: true,
                    avatarImageUrl: true
                }
            }
        }
    }>
}


export default function ProductDetails({ product }: ProductDetailsProps) {

    const { toggleCart, addProduct } = useContext(CartContext)

    const [quantity, setQuantity] = useState<number>(1)

    const handleDecreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity((prev) => prev - 1)
        }
    }

    const handleIncreaseQuantity = () => {
        setQuantity((prev) => prev + 1)
    }

    const handleAddToCart = () => {
        addProduct({
            ...product,
            quantity
        })
        toggleCart()
    }

    return (
        <>
            <div className='relative z-50 mt-[-1.5rem] rounded-t-3xl p-5 flex flex-col flex-auto overflow-hidden'>
                <div className='flex-auto overflow-hidden'>
                    <div className='flex items-center gap-1'>
                        <Image
                            src={product.restaurant.avatarImageUrl}
                            alt={product.restaurant.name}
                            width={16}
                            height={16}
                            className='rounded-full'
                        />
                        <p className='mt-1 text-xs text-muted-foreground'>
                            {product.restaurant.name}
                        </p>
                    </div>
                    <h2 className='text-xl font-semibold'>{product.name}</h2>
                    <div className='flex items-center justify-between mt-3'>
                        <h3 className='text-xl font-semibold'>{FormatCurrency(product.price)}</h3>
                        <div className='flex items-center gap-3 text-center'>
                            <Button variant="outline" className='h-8 w-8 rounded-xl' onClick={handleDecreaseQuantity}>
                                <ChevronLeftIcon />
                            </Button>
                            <p className='w-4'>{quantity}</p>
                            <Button variant="destructive" className='h-8 w-8 rounded-xl' onClick={handleIncreaseQuantity}>
                                <ChevronRightIcon />
                            </Button>
                        </div>
                    </div>
                    <ScrollArea className='h-full'>
                        <div className='mt-6 space-y-3'>
                            <h4 className='font-semibold'>Sobre</h4>
                            <p className='text-sm text-muted-foreground'>{product.description}</p>
                        </div>
                        <div className='mt-6 space-y-3'>
                            <div className="flex items-center gap-1">
                                <ChefHatIcon size={18} />
                                <h4 className='font-semibold'>Ingredientes</h4>
                            </div>
                            <ul className='list-disc px-5'>
                                {product.ingredients.map((ingredient) => (
                                    <li key={ingredient} className='text-sm text-muted-foreground '>{ingredient}</li>
                                ))}
                            </ul>

                        </div>
                    </ScrollArea>
                </div>
                <Button className='w-full rounded-full' onClick={handleAddToCart}>Adicionar à sacola</Button>

            </div>
            <CartSheet />
        </>
    )
}
