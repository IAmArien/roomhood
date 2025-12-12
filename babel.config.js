module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ts', '.tsx', '.js', '.json'],
        alias: {
          '@app': './src/app',
          '@branding/components': './src/presentation/components/branding/components',
          '@branding/assets': './src/presentation/components/branding/assets',
          '@branding/provider': './src/presentation/components/branding/provider',
          '@branding/styles': './src/presentation/components/branding/styles',
          '@branding/types': './src/presentation/components/branding/types'
        }
      }
    ],
    'react-native-reanimated/plugin'
  ]
};
