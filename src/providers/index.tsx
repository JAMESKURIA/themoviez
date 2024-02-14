import { PaperProvider } from 'react-native-paper'

import { LOG } from '@/lib/logger'
import React from 'react'
import { ThemeProvider } from './ThemeProvider'

const logger = LOG.extend('ProvidersHome')

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <PaperProvider>
            <ThemeProvider>{children}</ThemeProvider>
        </PaperProvider>
    )
}
