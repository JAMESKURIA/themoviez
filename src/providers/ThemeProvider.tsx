import { useColorScheme } from 'nativewind'
import React, { createContext } from 'react'
import { View } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { LOG } from '@/lib/logger'
import { themes } from '@/utils/color-theme'
import { StatusBar } from 'expo-status-bar'

interface ThemeProviderProps {
    children: React.ReactNode
}

export const ThemeContext = createContext<{
    theme: 'light' | 'dark'
}>({
    theme: 'light',
})

const logger = LOG.extend('ThemeProvider')

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
    const { colorScheme, setColorScheme } = useColorScheme()

    // React.useState(() => {
    //     setColorScheme('system')
    // }, [])

    return (
        <ThemeContext.Provider value={{ theme: colorScheme }}>
            <SafeAreaProvider>
                <View style={themes[colorScheme]} className="flex-1">
                    <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
                    {/* <SafeAreaView style={{ flex: 1 }} className="bg-primary-light"> */}
                    {children}
                    {/* </SafeAreaView> */}
                </View>
            </SafeAreaProvider>
        </ThemeContext.Provider>
    )
}
