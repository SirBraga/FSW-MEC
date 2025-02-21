import { getRestaurantAllInfo } from '@/data/getRoutes'
import { notFound } from 'next/navigation'
import React from 'react'
import RestaurantHeader from './components/header'
import RestaurantCategories from './components/categories'


interface RestaurantMenuPageProps {
    params: Promise<{slug: string}>
    searchParams: Promise<{consumptionMethod: string}>
}

const isConsumptionMethodValid = (method: string) => {
    return ['DINE_IN', 'TAKEAWAY'].includes(method)
}


export default async function RestaurantMenuPage({params, searchParams}: RestaurantMenuPageProps) {
   
    const { slug } = await params
    const { consumptionMethod } = await searchParams
    const restaurant = await getRestaurantAllInfo(slug)
 
    if (!isConsumptionMethodValid(consumptionMethod)) {
        return notFound()
    }
    
    if (!restaurant) {
        return notFound()
    }

  return (
    <div>
        <RestaurantHeader restaurant={restaurant} />
        <RestaurantCategories restaurant={restaurant} />
    </div>
  )
}
