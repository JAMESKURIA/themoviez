import { Link } from 'expo-router'
import { useColorScheme } from 'nativewind'
import React from 'react'
import { Text, View } from 'react-native'

import UiButton from './_components/button'

import { LOG } from '@/lib/logger'

const log = LOG.extend('HomePage')

export default function Page() {
    const { toggleColorScheme, colorScheme } = useColorScheme()
    return (
        <View className="flex-1 bg-primary items-center justify-center ">
            <UiButton
                onPress={() => {
                    toggleColorScheme()
                    log.info('Changed color scheme to ', colorScheme)
                }}>
                <Text className="text-primary">Toggle Color Scheme</Text>
            </UiButton>
            <View>
                <Text className="text-3xl p-8 text-accent-light">Hello World</Text>
                <Text>This is the first page of your app.</Text>
                <Text className="text-lg py-2">Color Scheme: {colorScheme}</Text>
            </View>

            <UiButton>
                <Link href="/table">TABLE</Link>
            </UiButton>
        </View>
    )
}
