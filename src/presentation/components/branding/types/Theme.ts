/**
 * Property of Norman Palisoc (https://github.com/IAmArien)
 * Reuse as a whole or in part is prohibited without permission.
 */

interface UIColors {
  'primary': string;
  'secondary': string;
  'tertiary': string;
  'quaternary': string;
  'steel-grey': string;
  'pure-white': string;
}

interface FunctionalColors {
  positive: string;
  negative: string;
  warning: string;
  disabled: string;
}

interface TextColors {
  clearest: string;
  clearer: string;
  clear: string;
  ghost: string;
  white: string;
}

interface SurfaceColors {
  'cool-white': string;
  'desaturated-blue-grey': string;
  'lightest-periwinkle': string;
  'white-surface': string;
}

interface BorderColors {
  grey: string;
}

export interface Colors {
  ui: UIColors;
  functional: FunctionalColors;
  text: TextColors;
  surface: SurfaceColors;
  border: BorderColors;
}

interface FontSize {
  fontFamily: string;
  fontWeight?: string;
  fontSize: number;
  lineHeight: number;
}

export interface FontFamily {
  'regular': string;
  'semi-bold': string;
  'bold': string;
  'extra-bold': string;
}

export interface Typography {
  headline: {
    lg: FontSize;
    md: FontSize;
    sm: FontSize;
  };
  title: {
    'semi-bold-xl': FontSize;
    'semi-bold-lg': FontSize;
    'semi-bold-md': FontSize;
    'semi-bold-sm': FontSize;
    'semi-bold-xs': FontSize;
    'bold-xl': FontSize;
    'bold-lg': FontSize;
    'bold-md': FontSize;
    'bold-sm': FontSize;
    'bold-xs': FontSize;
  };
  overline: {
    xl: FontSize;
    lg: FontSize;
    md: FontSize;
    sm: FontSize;
    xs: FontSize;
  };
  description: {
    lg: FontSize;
    md: FontSize;
    sm: FontSize;
    xs: FontSize;
  };
  paragraph: {
    lg: FontSize;
    md: FontSize;
    sm: FontSize;
  };
  interactions: {
    xl: FontSize;
    lg: FontSize;
    md: FontSize;
    sm: FontSize;
  };
  numbers: {
    xxl: FontSize;
    xl: FontSize;
    lg: FontSize;
    md: FontSize;
    sm: FontSize;
    xs: FontSize;
  };
}

export interface Properties {
  radius: Radius;
  shadows: Shadows;
}

export interface Radius {
  'less-round': number;
  'round': number;
  'rounder': number;
  'roundest': number;
}

export interface Shadows {
  softest: ShadowsProps;
  softer: ShadowsProps;
  soft: ShadowsProps;
}

export interface ShadowsLight {
  softest?: ShadowsProps;
  softer?: ShadowsProps;
  soft?: ShadowsProps;
}

export interface ShadowsDark {
  softest?: ShadowsProps;
  softer?: ShadowsProps;
  soft?: ShadowsProps;
}

export interface ShadowsProps {
  shadowColor: string;
  shadowOffset: {
    width: number;
    height: number;
  };
  shadowOpacity: number;
  shadowRadius: number;
  elevation: number;
}

export interface Shadows {
  softest: ShadowsProps;
  softer: ShadowsProps;
  soft: ShadowsProps;
}

export interface Theme {
  colors: Colors;
  typography: Typography;
  properties: {
    radius: Radius;
    shadows: Shadows;
  };
}
