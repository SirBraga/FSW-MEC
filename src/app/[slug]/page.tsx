import ConsumptionMethodOption from '@/components/ui/ConsumptionMethodOption/ConsumptionMethodOption'
import { getRestaurantBySlug } from '@/data/getRoutes'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import React from 'react'

interface RestaurantPageProps {
    params: Promise<{ slug: string }>
}

export default async function RestaurantPage({ params }: RestaurantPageProps) {
    const { slug } = await params
    const restaurant = await getRestaurantBySlug(slug)

    if (!restaurant) {
        return notFound()
    }

    return (
        <div className='h-screen flex flex-col items-center justify-center px-6 pt-24'>
            <div className="flex flex-col items-center gap-2">
                <Image src={restaurant.avatarImageUrl} alt={restaurant.name} width={82} height={82} />
                <h2 className='font-bold'>{restaurant.name}</h2>
            </div>
            <div className='pt-24 text-center space-y-2'>
                <h3 className='text-2xl font-semibold'>
                    Seja bem-vindo!
                </h3>
                <p className='opacity-55'>
                    Escolha como prefere aproveitar sua refeição. Estamos aqui para oferecer
                    paticidade e sabor em cada detalhe!
                </p>
            </div>
            <div className="pt-14 grid grid-cols-2 gap-4">
                <ConsumptionMethodOption
                    imageAlt='Para comer aqui'
                    imageUrl='/images/dine_in.png'
                    buttonText='Para comer aqui'
                    option='DINE_IN'
                    slug={slug}
                />
                <ConsumptionMethodOption
                    imageAlt='Para levar'
                    imageUrl='/images/takeaway.png'
                    buttonText='Para levar'
                    option='TAKEAWAY'
                    slug={slug}
                />
            </div>
        </div>
    )
}
