/**
 * Property of Norman Palisoc (https://github.com/IAmArien)
 * Reuse as a whole or in part is prohibited without permission.
 */

/**
 * Type object for theme colors. This type object is used for extending theme of
 * branding sdk. The object structure represents how to override the default theme.
 * Color objects are `ui`, `functional`, `text`, `surfaces`, and `border`.
 */
export type ThemeColorProps = {
  ui?: {
    primary?: string;
    secondary?: string;
    tertiary?: string;
    quaternary?: string;
    'steel-grey'?: string;
    'pure-white'?: string;
  };
  functional?: {
    positive?: string;
    negative?: string;
    warning?: string;
    disabled?: string;
    loading?: {
      from: string;
      to: string;
    };
  };
  text?: {
    clearest?: string;
    clearer?: string;
    clear?: string;
    ghost?: string;
    white?: string;
  };
  surfaces?: {
    'cool-white'?: string;
    'desaturated-blue-grey'?: string;
    'lightest-periwinkle'?: string;
    'white-surface'?: string;
  };
  border?: {
    grey?: string;
  };
};

/**
 * Type object for theme font family. This type object is used for extending theme
 * of font family of typography element. Contains string sets of the following font
 * weights of font families: `regular`, `semi-bold`, `bold`, and `extra-bold`.
 */
export type ThemeFontFamilyProps = {
  regular: string;
  'semi-bold': string;
  bold: string;
  'extra-bold': string;
};

/**
 * Type object of theme radius properties, contains string sets of the following
 * allowed radius: `less-round`, `round`, `rounder`, and `roundest`.
 */
export type ThemeRadiusProps = {
  'less-round'?: number;
  round?: number;
  rounder?: number;
  roundest?: number;
};

/**
 * Type object of theme shadows properties, contains the needed values structured to
 * create a shadow in a view.
 */
export type ThemeShadowClassProps = {
  softest?: ThemeShadowProps;
  softer?: ThemeShadowProps;
  soft?: ThemeShadowProps;
};

/**
 * Type object of theme shadows properties, contains the needed values structured to
 * create a shadow in a view.
 */
export type ThemeShadowTypeProps = {
  softest?: ThemeShadowProps;
  softer?: ThemeShadowProps;
  soft?: ThemeShadowProps;
};

/**
 * Type object of theme shadows properties, contains the needed values structured to
 * create a shadow in a view.
 */
export type ThemeShadowProps = {
  shadowColor: string;
  shadowOffset: {
    width: number;
    height: number;
  };
  shadowOpacity: number;
  shadowRadius: number;
  elevation: number;
};

/**
 * Type object for theme properties (radius/shadows). This type object is used for
 * extending theme of properties (radius/shadows). Contains objects of `radius`, and
 * `shadows` (softest, softer, soft).
 * @see ThemeRadiusProps
 * @see ThemeShadowProps
 */
export type ThemeProperties = {
  radius?: ThemeRadiusProps;
  shadows?: ThemeShadowClassProps;
};

/**
 * Type object for extending Theme Provider theme, used as general basis for styling
 * the branding sdk theme. Contains objects of `colors`, `fontFamily`, and `properties`.
 * @param colors ThemeColorProps object representing the available colors of the
 * branding theme structured in different object sets such as `ui`, `text`, `surfaces`
 * etc.
 * @param fontFamily ThemeFontFamilyProps object representing the available font families
 * of the branding theme structured in different string sets such as `regular`,
 * `semi-bold` etc.
 * @param properties ThemeProperties object representing the available properties
 * (radius/shadows) of the branding theme structured in two object sets: `radius` and
 * `shadows`
 * @see ThemeColorProps
 * @see ThemeFontFamilyProps
 * @see ThemeProperties
 */
export type ThemeProps = {
  /**
   * @param colors ThemeColorProps object representing the available colors of the
   * branding theme structured in different object sets such as `ui`, `text`, `surfaces`
   * etc.
   * @see ThemeColorProps
   */
  colors?: ThemeColorProps;
  /**
   * @param fontFamily ThemeFontFamilyProps object representing the available font families
   * of the branding theme structured in different string sets such as `regular`,
   * `semi-bold` etc.
   * @see ThemeFontFamilyProps
   */
  fontFamily?: ThemeFontFamilyProps;
  /**
   * @param properties ThemeProperties object representing the available properties
   * (radius/shadows) of the branding theme structured in two object sets: `radius` and
   * `shadows`
   * @see ThemeProperties
   */
  properties?: ThemeProperties;
};
