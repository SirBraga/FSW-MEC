import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'
import { ConsumptionMethod } from '@prisma/client'

interface ConsumptionMethodOptionProps {
    imageUrl: string
    imageAlt: string
    buttonText: string
    option: ConsumptionMethod
    slug: string
}

export default function ConsumptionMethodOption({ imageAlt, imageUrl, buttonText, option, slug }: ConsumptionMethodOptionProps) {
    return (
        <Link href={`${slug}/menu?consumptionMethod=${option}`}>
            <Card>
                <CardContent className='flex flex-col items-center gap-8 py-8'>
                    <div className='relative h-20 w-20'>
                        <Image src={imageUrl} alt={imageAlt} fill className='object-contain' />
                    </div>
                    <Button variant="secondary" className='rounded-full w-full'>
                        {buttonText}
                    </Button>
                </CardContent>
            </Card>
        </Link>
    )
}
