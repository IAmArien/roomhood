/**
 * Property of Norman Palisoc (https://github.com/IAmArien)
 * Reuse as a whole or in part is prohibited without permission.
 */

import { ThemeColorProps } from '../../provider/types';
import { Colors } from '../../types/Theme';

/**
 * The default colors of the branding sdk theme.
 */
export const defaultColors: Colors = {
  ui: {
    primary: '#007EDA',
    secondary: '#00A6ED',
    tertiary: '#0E2C43',
    quaternary: '#CDE0FD',
    'steel-grey': '#CFD6DF',
    'pure-white': '#FFFFFF',
  },
  functional: {
    positive: '#47BA6E',
    negative: '#E84A4A',
    warning: '#F58928',
    disabled: '#E7EBEF',
  },
  text: {
    clearest: '#09223E',
    clearer: '#444D57',
    clear: '#77797B',
    ghost: '#BCC1C7',
    white: '#FFFFFF',
  },
  surface: {
    'cool-white': '#F5F8FC',
    'desaturated-blue-grey': '#ECF3F7',
    'lightest-periwinkle': '#E7F0FF',
    'white-surface': '#FFFFFF',
  },
  border: {
    grey: '#D7DCE2',
  },
};

/**
 * Handy function used to override the Colors object of the branding sdk theme.
 * Accepts params of `ThemeColorProps` structured in a way to override the default
 * color theme of the branding sdk.
 * @param colors Type of ThemeColorProps
 * @see ThemeColorProps
 * @returns Colors object of the branding sdk theme
 */
export const colors = (colors?: ThemeColorProps): Colors => {
  return {
    ui: {
      primary: colors?.ui?.primary ?? defaultColors.ui.primary,
      secondary: colors?.ui?.secondary ?? defaultColors.ui.secondary,
      tertiary: colors?.ui?.tertiary ?? defaultColors.ui.tertiary,
      quaternary: colors?.ui?.quaternary ?? defaultColors.ui.quaternary,
      'steel-grey': colors?.ui?.['steel-grey'] ?? defaultColors.ui['steel-grey'],
      'pure-white': colors?.ui?.['pure-white'] ?? defaultColors.ui['pure-white'],
    },
    functional: {
      positive: colors?.functional?.positive ?? defaultColors.functional.positive,
      negative: colors?.functional?.negative ?? defaultColors.functional.negative,
      warning: colors?.functional?.warning ?? defaultColors.functional.warning,
      disabled: colors?.functional?.disabled ?? defaultColors.functional.disabled,
    },
    text: {
      clearest: colors?.text?.clearest ?? defaultColors.text.clearest,
      clearer: colors?.text?.clearer ?? defaultColors.text.clearer,
      clear: colors?.text?.clear ?? defaultColors.text.clear,
      ghost: colors?.text?.ghost ?? defaultColors.text.ghost,
      white: colors?.text?.white ?? defaultColors.text.white,
    },
    surface: {
      'cool-white': colors?.surfaces?.['cool-white'] ?? defaultColors.surface['cool-white'],
      'desaturated-blue-grey':
        colors?.surfaces?.['desaturated-blue-grey'] ??
        defaultColors.surface['desaturated-blue-grey'],
      'lightest-periwinkle':
        colors?.surfaces?.['lightest-periwinkle'] ?? defaultColors.surface['lightest-periwinkle'],
      'white-surface':
        colors?.surfaces?.['white-surface'] ?? defaultColors.surface['white-surface'],
    },
    border: {
      grey: colors?.border?.grey ?? defaultColors.border.grey,
    },
  };
};
