import { db } from "@/lib/prisma"

export const getRestaurantBySlug = async (slug: string) => {
    const restaurant = await db.restaurant.findFirst({where: {slug}})
    return restaurant
}

export const getRestaurantWithCategories = async (slug: string) => {
    const restaurant = await db.restaurant.findFirst({
        where: {slug},
        include: {
           menuCategories: true
        }
    })
    return restaurant
}

export const getRestaurantAllInfo = async (slug: string) => {
    const restaurant = await db.restaurant.findFirst({
        where: {slug},
        include: {
           menuCategories: {
            include: {
                products: true
            }
           }
        }
    })
    return restaurant
}