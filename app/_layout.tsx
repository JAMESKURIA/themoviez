import { Asset } from 'expo-asset'
import Constants from 'expo-constants'
import { Slot } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import React from 'react'
import { Animated, StyleSheet, View } from 'react-native'

import { LOG } from '@/lib/logger'
import Providers from '@/providers'
import '../global.css'

const log = LOG.extend('AppLayout')

export const unstable_settings = {
    initialRouteName: 'index',
}

SplashScreen.preventAutoHideAsync().catch(() => {
    /* reloading the app might trigger some race conditions, ignore them */
})

export default function App() {
    return (
        <AnimatedAppLoader image={{ uri: Constants.expoConfig?.splash?.image }}>
            <Providers>
                <Slot />
            </Providers>
        </AnimatedAppLoader>
    )
}

function AnimatedAppLoader({ children, image }) {
    const [isSplashReady, setSplashReady] = React.useState(false)

    React.useEffect(() => {
        async function prepare() {
            try {
                await Asset.fromURI(image.uri)?.downloadAsync()
            } catch (error) {
                log.error(error)
            }
            setSplashReady(true)
        }

        prepare()
    }, [image])

    if (!isSplashReady) {
        return null
    }

    return <AnimatedSplashScreen image={image}>{children}</AnimatedSplashScreen>
}

function AnimatedSplashScreen({ children, image }) {
    const animation = React.useMemo(() => new Animated.Value(1), [])
    const [isAppReady, setAppReady] = React.useState(false)
    const [isSplashAnimationComplete, setAnimationComplete] = React.useState(false)

    React.useEffect(() => {
        if (isAppReady) {
            Animated.timing(animation, {
                toValue: 0,
                duration: 1000,
                useNativeDriver: true,
            }).start(() => setAnimationComplete(true))
        }
    }, [isAppReady])

    const onImageLoaded = React.useCallback(async () => {
        try {
            await SplashScreen.hideAsync()
            // Load stuff
            await Promise.all([])
        } catch (e) {
            // handle errors
            log.error(e)
        } finally {
            setAppReady(true)
        }
    }, [])

    return (
        <View style={{ flex: 1 }}>
            {isAppReady && children}
            {!isSplashAnimationComplete && (
                <Animated.View
                    pointerEvents="none"
                    style={[
                        StyleSheet.absoluteFill,
                        {
                            backgroundColor: Constants.expoConfig?.splash?.backgroundColor,
                            opacity: animation,
                        },
                    ]}>
                    <Animated.Image
                        style={{
                            width: '100%',
                            height: '100%',
                            resizeMode: Constants.expoConfig?.splash?.resizeMode ?? 'contain',
                            transform: [
                                {
                                    scale: animation,
                                },
                            ],
                        }}
                        source={image}
                        onLoadEnd={onImageLoaded}
                        fadeDuration={0}
                    />
                </Animated.View>
            )}
        </View>
    )
}
