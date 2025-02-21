'use client'

import { Prisma } from '@prisma/client'
import React, { useState } from 'react'
import Image from 'next/image'
import { ClockIcon } from 'lucide-react'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import Products from './products'

interface RestaurantCategoriesProps {
    restaurant: Prisma.RestaurantGetPayload<{
        include: {
            menuCategories: {
                include: {
                    products: true
                }
            }
        }
    }>
}

type menuCategoriesWithProducts = Prisma.MenuCategoryGetPayload<{
    include: {
        products: true
    }

}>

export default function RestaurantCategories({ restaurant }: RestaurantCategoriesProps) {

    const [selectedCategory, setSelectedCategory] = useState<menuCategoriesWithProducts>(restaurant.menuCategories[0])

    const handleCategoryClick = (category: menuCategoriesWithProducts) => {
        setSelectedCategory(category)
    }
    return (
        <div className='relative z-50 mt-[-1.5rem] rounded-t-3xl bg-white'>
            <div className='p-5'>
            <div className='flex items-center gap-3 '>
                <Image src={restaurant.avatarImageUrl} alt={restaurant.name} width={45} height={45} />
                <div className=''>
                    <h2 className='font-semibold text-lg'>{restaurant.name}</h2>
                    <p className='text-xs opacity-55'>{restaurant.description}</p>
                </div>
            </div>
            <div className='flex items-center gap-1 text-xs text-green-500 mt-3'>
                <ClockIcon size={12}/>
                <p>Aberto!</p>
            </div>
            </div>

            <ScrollArea className='w-full'>
                <div className='flex w-max space-x-4 p-4 pt-0'>
                    {restaurant.menuCategories.map((category: menuCategoriesWithProducts) => (
                        <Button 
                            key={category.id} 
                            onClick={() => handleCategoryClick(category)} 
                            variant={selectedCategory.id === category.id ? 'default' : 'secondary'} 
                            size={'sm'} 
                            className='rounded-full'>
                            {category.name}
                        </Button>
                    ))}
                </div>
                <ScrollBar orientation='horizontal' />
            </ScrollArea>
            <h3 className='px-5 font-semibold pt-2'>
                {selectedCategory.name}
            </h3>
            <Products products={selectedCategory.products} />
        </div>
    )
}
