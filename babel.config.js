module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ts', '.tsx', '.js', '.json'],
        alias: {
          '@app/context': './src/app/context',
          '@app/hooks': './src/app/hooks',
          '@app/navigation': './src/app/navigation',
          '@branding/components': './src/presentation/components/branding/components',
          '@branding/assets': './src/presentation/components/branding/assets',
          '@branding/provider': './src/presentation/components/branding/provider',
          '@branding/styles': './src/presentation/components/branding/styles',
          '@branding/types': './src/presentation/components/branding/types',
          "@presentation/screens": './src/presentation/screens'
        }
      }
    ],
    'react-native-reanimated/plugin'
  ]
};
