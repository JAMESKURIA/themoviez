import { VariantProps, cva } from 'class-variance-authority'
import * as React from 'react'
import { View } from 'react-native'
import { Text, TouchableRipple } from 'react-native-paper'

import { cn } from '@/lib/tailwind'

const buttonVariants = cva(
    'flex items-center justify-center rounded-md text-sm font-medium overflow-hidden',
    {
        variants: {
            variant: {
                default: 'bg-primary-light  rounded-full p-5',
                edged: 'bg-primary-light  rounded-none p-5',
            },
            size: {
                default: 'h-12 py-2 px-6',
                small: 'h-8 py-2 px-6',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    },
)

type TouchableRippleProps = React.ComponentProps<typeof TouchableRipple>

export type UiButtonProps = TouchableRippleProps & VariantProps<typeof buttonVariants>

const UiButton = React.forwardRef(
    (
        { variant, size, className, children, ...props }: UiButtonProps,
        ref: React.Ref<View> | undefined,
    ) => (
        <TouchableRipple
            ref={ref}
            className={cn(buttonVariants({ variant, size, className }))}
            rippleColor="rgba(0, 0, 0, .2)"
            {...props}>
            {typeof children === 'string' ? <Text>{children}</Text> : children}
        </TouchableRipple>
    ),
)

export default UiButton
