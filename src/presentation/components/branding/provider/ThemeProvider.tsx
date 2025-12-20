/**
 * Property of Norman Palisoc (https://github.com/IAmArien)
 * Reuse as a whole or in part is prohibited without permission.
 */

import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useMemo,
  useState
} from 'react';

import {
  colors as defaultColors,
  fontFamily as defaultFontFamily,
  properties as defaultProperties
} from '../styles';
import { ThemeProps } from './types';
import { colors } from '../styles/colors';
import { properties } from '../styles/properties';
import { typography } from '../styles/typography';
import { Theme } from '../types/Theme';

export const ThemeContext = createContext({
  theme: {} as Theme,
  setTheme: {} as Dispatch<SetStateAction<Theme>>
});

/**
 * Custom hook function to use branding theme properties such as `colors` (which contains
 * UI, Functional Indicators, Borders, etc.), `typography` (which contains headlines,
 * descriptions, title, etc.) and `properties` (which contains radius and shadows).
 * Sample usage would be:
 * ```
 * const { colors, typography, properties } = useTheme();
 *
 * console.log(colors.ui.primary);
 * console.log(typography.title.sm);
 * console.log(properties.radius.round);
 * console.log(properties.shadows.softest);
 * ```
 * @see Theme
 * @returns Theme object containing the theme from the `defaultTheme` or from the
 * new theme applied using `extendTheme` if passed in `ThemeProvider`.
 */
export const useTheme = (): Theme => {
  const { theme } = useContext(ThemeContext);
  return theme;
};

/**
 * The default theme object used by the branding sdk. Typed with Theme
 * @see Theme
 */
const defaultTheme: Theme = {
  colors: colors(defaultColors),
  typography: typography(defaultFontFamily),
  properties: properties(defaultProperties)
};

/**
 * @param theme Type of ThemeProps, used to override the default theme of the Theme
 * Provider context. Sample implementation would be:
 * ```
 * const newTheme = extendTheme({
 *  colors: {
 *    ui: {
 *      primary: '#000000',
 *      secondary: '#FFFFFF'
 *    },
 *  },
 *  fontFamily: {
 *    'regular': 'HeptaSlab-Regular',
 *    'semi-bold': 'HeptaSlab-SemiBold',
 *    'bold': 'HeptaSlab-Bold',
 *    'extra-bold': 'HeptaSlab-ExtraBold'
 *  }
 * });
 *
 * <ThemeProvider theme={newTheme}>
 *  ...
 *  ...
 * </ThemeProvider>
 * ```
 * @see ThemeProps
 * @see Theme
 * @returns Theme object wrapping the new theme applied using this function and will
 * be passed in Theme Provider context
 */
export const extendTheme = (theme: ThemeProps): Theme => {
  let updatedTheme = { ...defaultTheme };
  const newFontFamily = theme.fontFamily;
  const newColors = theme.colors;
  const newProperties = theme.properties;

  if (newFontFamily !== undefined) {
    updatedTheme.typography = typography(newFontFamily);
  }

  if (newColors !== undefined) {
    updatedTheme.colors = colors(newColors);
  }

  if (newProperties !== undefined) {
    updatedTheme.properties = properties(newProperties);
  }

  return updatedTheme;
};

interface ThemeProviderProps {
  theme?: Theme | null;
  children: ReactNode;
}

/**
 * Theme Provider component for branding SDK. Accepts the following props: `theme` of Type
 * `Theme` and `children` components. Used to enable and integrate branding SDK.
 * @param props Type of ThemeProviderProps
 * @see ThemeProviderProps
 * @returns JSX Element of Theme Provider wrapping the entire host app with theme context
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  theme,
  children
}: ThemeProviderProps) => {
  const [brandingTheme, setBrandingTheme] = useState<Theme>(
    theme ?? defaultTheme
  );

  const initialContext = useMemo(
    () => ({
      theme: brandingTheme,
      setTheme: setBrandingTheme
    }),
    [brandingTheme, setBrandingTheme]
  );

  return (
    <ThemeContext.Provider value={initialContext}>
      {children}
    </ThemeContext.Provider>
  );
};
