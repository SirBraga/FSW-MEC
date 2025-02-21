'use client'

import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ChevronLeftIcon, ScrollTextIcon } from 'lucide-react'
import { Restaurant } from '@prisma/client'
import { useRouter } from 'next/navigation'

interface RestaurantHeaderProps {
    restaurant: Pick<Restaurant, 'name' | 'coverImageUrl'>
}

export default function RestaurantHeader({restaurant}: RestaurantHeaderProps) {

    const router = useRouter()

  return (
    <div className='relative h-[250px] w-full'>
    <Button onClick={()=> router.back()} className='absolute top-4 left-4 z-50 rounded-full' variant="secondary" size={"icon"}>
        <ChevronLeftIcon />
    </Button>
    <Image src={restaurant.coverImageUrl} alt={restaurant.name} fill className="object-cover" />
    <Button className='absolute top-4 right-4 z-50 rounded-full' variant="secondary" size={"icon"}>
        <ScrollTextIcon />
    </Button>
</div>
  )
}
