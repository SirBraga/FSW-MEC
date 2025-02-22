import { db } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import React from 'react'
import ProductHeader from './components/ProductHeader';
import ProductDetails from './components/ProductDetails';

interface ProductPageProps {
    params: Promise<{ slug: string; productid: string }>
}

export default async function ProductPage({ params }: ProductPageProps) {

    const { slug, productid } = await params
    const product = await db.product.findFirst({
        where: { id: productid },
        include: {
            restaurant: {
                select: {
                    name: true,
                    avatarImageUrl: true,
                    slug: true
                }
            }
        }
    })

    if (!product) {
        return notFound()
    }
    if (product.restaurant.slug.toUpperCase() !== slug.toUpperCase()) {
        return notFound()
    }

    return (
        <>
            <div className='flex flex-col h-full'>
                <ProductHeader product={product} />
                <ProductDetails product={product} />
            </div>
        </>
    )
}
