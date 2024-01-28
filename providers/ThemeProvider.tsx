import { useColorScheme } from 'nativewind'
import React, { createContext } from 'react'
import { View } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'

import { themes } from '@/utils/color-theme'

interface ThemeProviderProps {
    children: React.ReactNode
}

export const ThemeContext = createContext<{
    theme: 'light' | 'dark'
}>({
    theme: 'light',
})

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
    const { colorScheme } = useColorScheme()
    return (
        <ThemeContext.Provider value={{ theme: colorScheme }}>
            <SafeAreaProvider>
                <View style={themes[colorScheme]} className="flex-1">
                    <SafeAreaView style={{ flex: 1 }}>{children}</SafeAreaView>
                </View>
            </SafeAreaProvider>
        </ThemeContext.Provider>
    )
}
