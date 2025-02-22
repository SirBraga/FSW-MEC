'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ChevronLeftIcon, ScrollTextIcon } from 'lucide-react'

interface ProductHeaderProps {
    product: {
        name: string
        imageUrl: string
    }
}

export default function ProductHeader({product}: ProductHeaderProps) {

    const router = useRouter()

    return (
        <div className='relative min-h-[300px] w-full'>
            <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className='object-contain'
            />
            <Button onClick={() => router.back()} className='absolute top-4 left-4 z-50 rounded-full' variant="secondary" size={"icon"}>
                <ChevronLeftIcon />
            </Button>
            <Button className='absolute top-4 right-4 z-50 rounded-full' variant="secondary" size={"icon"}>
                <ScrollTextIcon />
            </Button>
        </div>
    )
}
