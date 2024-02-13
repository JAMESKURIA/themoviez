const { getDefaultConfig } = require('expo/metro-config')
const { withNativeWind } = require('nativewind/metro')

// eslint-disable-next-line no-undef
const config = getDefaultConfig(__dirname, { isCSSEnabled: true })

module.exports = withNativeWind(config, { input: './src/styles/global.css' })
