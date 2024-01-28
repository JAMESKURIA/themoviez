import * as FileSystem from 'expo-file-system'
import { configLoggerType, consoleTransport, fileAsyncTransport, logger } from 'react-native-logs'

const today = new Date()
const date = today.getDate()
const month = today.getMonth() + 1
const year = today.getFullYear()

const defaultConfig: configLoggerType = {
    levels: {
        debug: 0,
        info: 1,
        warn: 2,
        error: 3,
    },
    // severity: __DEV__ ? 'debug' : 'error',
    transport: __DEV__ ? consoleTransport : fileAsyncTransport,
    transportOptions: {
        colors: {
            info: 'blueBright',
            warn: 'yellowBright',
            error: 'redBright',
            debug: 'greenBright',
        },
        FS: FileSystem,
        fileName: `logs_${date}-${month}-${year}.log`,
    },
    async: true,
    dateFormat: 'iso',
    printLevel: true,
    printDate: true,
    enabled: true,
}

export const LOG = logger.createLogger<'debug' | 'info' | 'error' | 'warn'>(defaultConfig)
