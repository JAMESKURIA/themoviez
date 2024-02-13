import { PaperProvider } from 'react-native-paper'

import { ThemeProvider } from './ThemeProvider'

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <PaperProvider>
            <ThemeProvider>{children}</ThemeProvider>
        </PaperProvider>
    )
}
