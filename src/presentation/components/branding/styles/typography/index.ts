/**
 * Property of Norman Palisoc (https://github.com/IAmArien)
 * Reuse as a whole or in part is prohibited without permission.
 */

import { Platform } from 'react-native';

import { ThemeFontFamilyProps } from '../../provider/types';
import { FontFamily, Typography } from '../../types/Theme';

/**
 * The default font family / font weight of the Typography of the branding sdk theme.
 * @see FontFamily
 */
export const defaultFontFamily: FontFamily = {
  'regular': 'OpenSans-Regular',
  'semi-bold': 'OpenSans-SemiBold',
  'bold': 'OpenSans-Bold',
  'extra-bold': 'OpenSans-ExtraBold'
};

/**
 * The default typography of the branding sdk theme.
 * @see Typography
 */
export const defaultTypography: Typography = {
  headline: {
    lg: {
      fontFamily: defaultFontFamily['semi-bold'],
      fontWeight: Platform.select({ ios: '600', android: undefined }),
      fontSize: 64,
      lineHeight: 96
    },
    md: {
      fontFamily: defaultFontFamily['semi-bold'],
      fontWeight: Platform.select({ ios: '600', android: undefined }),
      fontSize: 48,
      lineHeight: 72
    },
    sm: {
      fontFamily: defaultFontFamily.bold,
      fontWeight: Platform.select({ ios: '700', android: undefined }),
      fontSize: 40,
      lineHeight: 60
    }
  },
  title: {
    'semi-bold-xl': {
      fontFamily: defaultFontFamily['semi-bold'],
      fontWeight: Platform.select({ ios: '600', android: undefined }),
      fontSize: 36,
      lineHeight: 54
    },
    'semi-bold-lg': {
      fontFamily: defaultFontFamily['semi-bold'],
      fontWeight: Platform.select({ ios: '600', android: undefined }),
      fontSize: 32,
      lineHeight: 48
    },
    'semi-bold-md': {
      fontFamily: defaultFontFamily['semi-bold'],
      fontWeight: Platform.select({ ios: '600', android: undefined }),
      fontSize: 24,
      lineHeight: 36
    },
    'semi-bold-sm': {
      fontFamily: defaultFontFamily['semi-bold'],
      fontWeight: Platform.select({ ios: '600', android: undefined }),
      fontSize: 20,
      lineHeight: 30
    },
    'semi-bold-xs': {
      fontFamily: defaultFontFamily['semi-bold'],
      fontWeight: Platform.select({ ios: '600', android: undefined }),
      fontSize: 16,
      lineHeight: 24
    },
    'bold-xl': {
      fontFamily: defaultFontFamily.bold,
      fontWeight: Platform.select({ ios: '700', android: undefined }),
      fontSize: 36,
      lineHeight: 54
    },
    'bold-lg': {
      fontFamily: defaultFontFamily.bold,
      fontWeight: Platform.select({ ios: '700', android: undefined }),
      fontSize: 32,
      lineHeight: 48
    },
    'bold-md': {
      fontFamily: defaultFontFamily.bold,
      fontWeight: Platform.select({ ios: '700', android: undefined }),
      fontSize: 24,
      lineHeight: 36
    },
    'bold-sm': {
      fontFamily: defaultFontFamily.bold,
      fontWeight: Platform.select({ ios: '700', android: undefined }),
      fontSize: 20,
      lineHeight: 30
    },
    'bold-xs': {
      fontFamily: defaultFontFamily.bold,
      fontWeight: Platform.select({ ios: '700', android: undefined }),
      fontSize: 16,
      lineHeight: 24
    }
  },
  overline: {
    xl: {
      fontFamily: defaultFontFamily.bold,
      fontWeight: Platform.select({ ios: '700', android: undefined }),
      fontSize: 24,
      lineHeight: 36
    },
    lg: {
      fontFamily: defaultFontFamily.bold,
      fontWeight: Platform.select({ ios: '700', android: undefined }),
      fontSize: 20,
      lineHeight: 30
    },
    md: {
      fontFamily: defaultFontFamily.bold,
      fontWeight: Platform.select({ ios: '700', android: undefined }),
      fontSize: 16,
      lineHeight: 24
    },
    sm: {
      fontFamily: defaultFontFamily.bold,
      fontWeight: Platform.select({ ios: '700', android: undefined }),
      fontSize: 14,
      lineHeight: 21
    },
    xs: {
      fontFamily: defaultFontFamily.bold,
      fontWeight: Platform.select({ ios: '700', android: undefined }),
      fontSize: 12,
      lineHeight: 18
    }
  },
  description: {
    lg: {
      fontFamily: defaultFontFamily.regular,
      fontWeight: Platform.select({ ios: '400', android: undefined }),
      fontSize: 20,
      lineHeight: 32
    },
    md: {
      fontFamily: defaultFontFamily.regular,
      fontWeight: Platform.select({ ios: '400', android: undefined }),
      fontSize: 16,
      lineHeight: 25.6
    },
    sm: {
      fontFamily: defaultFontFamily.regular,
      fontWeight: Platform.select({ ios: '400', android: undefined }),
      fontSize: 14,
      lineHeight: 19.6
    },
    xs: {
      fontFamily: defaultFontFamily.regular,
      fontWeight: Platform.select({ ios: '400', android: undefined }),
      fontSize: 12,
      lineHeight: 16.8
    }
  },
  paragraph: {
    lg: {
      fontFamily: defaultFontFamily.regular,
      fontWeight: Platform.select({ ios: '400', android: undefined }),
      fontSize: 20,
      lineHeight: 40
    },
    md: {
      fontFamily: defaultFontFamily.regular,
      fontWeight: Platform.select({ ios: '400', android: undefined }),
      fontSize: 16,
      lineHeight: 32
    },
    sm: {
      fontFamily: defaultFontFamily.regular,
      fontWeight: Platform.select({ ios: '400', android: undefined }),
      fontSize: 14,
      lineHeight: 28
    }
  },
  interactions: {
    xl: {
      fontFamily: defaultFontFamily.bold,
      fontWeight: Platform.select({ ios: '700', android: undefined }),
      fontSize: 20,
      lineHeight: 24
    },
    lg: {
      fontFamily: defaultFontFamily.bold,
      fontWeight: Platform.select({ ios: '700', android: undefined }),
      fontSize: 16,
      lineHeight: 19.2
    },
    md: {
      fontFamily: defaultFontFamily.bold,
      fontWeight: Platform.select({ ios: '700', android: undefined }),
      fontSize: 14,
      lineHeight: 16.8
    },
    sm: {
      fontFamily: defaultFontFamily['extra-bold'],
      fontWeight: Platform.select({ ios: '800', android: undefined }),
      fontSize: 12,
      lineHeight: 14.4
    }
  },
  numbers: {
    xxl: {
      fontFamily: defaultFontFamily.bold,
      fontWeight: Platform.select({ ios: '700', android: undefined }),
      fontSize: 40,
      lineHeight: 48
    },
    xl: {
      fontFamily: defaultFontFamily.bold,
      fontWeight: Platform.select({ ios: '700', android: undefined }),
      fontSize: 32,
      lineHeight: 38.4
    },
    lg: {
      fontFamily: defaultFontFamily.bold,
      fontWeight: Platform.select({ ios: '700', android: undefined }),
      fontSize: 24,
      lineHeight: 28.8
    },
    md: {
      fontFamily: defaultFontFamily.bold,
      fontWeight: Platform.select({ ios: '700', android: undefined }),
      fontSize: 20,
      lineHeight: 24
    },
    sm: {
      fontFamily: defaultFontFamily['extra-bold'],
      fontWeight: Platform.select({ ios: '800', android: undefined }),
      fontSize: 16,
      lineHeight: 19.2
    },
    xs: {
      fontFamily: defaultFontFamily['extra-bold'],
      fontWeight: Platform.select({ ios: '800', android: undefined }),
      fontSize: 12,
      lineHeight: 14.4
    }
  }
};

/**
 * Handy function used to override the Typography's font family value of the branding
 * sdk theme. Accepts params of `ThemeFontFamilyProps` structured in a way to override
 * the default font family of Typography of the branding sdk.
 * @param colors Type of ThemeFontFamilyProps
 * @see ThemeFontFamilyProps
 * @returns Typography object of the branding sdk theme
 */
export const typography = (fontFamily?: ThemeFontFamilyProps): Typography => {
  return {
    headline: {
      lg: {
        ...defaultTypography.headline.lg,
        fontFamily: fontFamily?.['semi-bold'] ?? defaultFontFamily['semi-bold']
      },
      md: {
        ...defaultTypography.headline.md,
        fontFamily: fontFamily?.['semi-bold'] ?? defaultFontFamily['semi-bold']
      },
      sm: {
        ...defaultTypography.headline.sm,
        fontFamily: fontFamily?.bold ?? defaultFontFamily.bold
      }
    },
    title: {
      'semi-bold-xl': {
        ...defaultTypography.title['semi-bold-xl'],
        fontFamily: fontFamily?.['semi-bold'] ?? defaultFontFamily['semi-bold']
      },
      'semi-bold-lg': {
        ...defaultTypography.title['semi-bold-lg'],
        fontFamily: fontFamily?.['semi-bold'] ?? defaultFontFamily['semi-bold']
      },
      'semi-bold-md': {
        ...defaultTypography.title['semi-bold-md'],
        fontFamily: fontFamily?.['semi-bold'] ?? defaultFontFamily['semi-bold']
      },
      'semi-bold-sm': {
        ...defaultTypography.title['semi-bold-sm'],
        fontFamily: fontFamily?.['semi-bold'] ?? defaultFontFamily['semi-bold']
      },
      'semi-bold-xs': {
        ...defaultTypography.title['semi-bold-xs'],
        fontFamily: fontFamily?.['semi-bold'] ?? defaultFontFamily['semi-bold']
      },
      'bold-xl': {
        ...defaultTypography.title['bold-xl'],
        fontFamily: fontFamily?.bold ?? defaultFontFamily.bold
      },
      'bold-lg': {
        ...defaultTypography.title['bold-lg'],
        fontFamily: fontFamily?.bold ?? defaultFontFamily.bold
      },
      'bold-md': {
        ...defaultTypography.title['bold-md'],
        fontFamily: fontFamily?.bold ?? defaultFontFamily.bold
      },
      'bold-sm': {
        ...defaultTypography.title['bold-sm'],
        fontFamily: fontFamily?.bold ?? defaultFontFamily.bold
      },
      'bold-xs': {
        ...defaultTypography.title['bold-xs'],
        fontFamily: fontFamily?.bold ?? defaultFontFamily.bold
      }
    },
    overline: {
      xl: {
        ...defaultTypography.overline.xl,
        fontFamily: fontFamily?.bold ?? defaultFontFamily.bold
      },
      lg: {
        ...defaultTypography.overline.lg,
        fontFamily: fontFamily?.bold ?? defaultFontFamily.bold
      },
      md: {
        ...defaultTypography.overline.md,
        fontFamily: fontFamily?.bold ?? defaultFontFamily.bold
      },
      sm: {
        ...defaultTypography.overline.sm,
        fontFamily: fontFamily?.bold ?? defaultFontFamily.bold
      },
      xs: {
        ...defaultTypography.overline.xs,
        fontFamily: fontFamily?.bold ?? defaultFontFamily.bold
      }
    },
    description: {
      lg: {
        ...defaultTypography.description.lg,
        fontFamily: fontFamily?.regular ?? defaultFontFamily.regular
      },
      md: {
        ...defaultTypography.description.md,
        fontFamily: fontFamily?.regular ?? defaultFontFamily.regular
      },
      sm: {
        ...defaultTypography.description.sm,
        fontFamily: fontFamily?.regular ?? defaultFontFamily.regular
      },
      xs: {
        ...defaultTypography.description.xs,
        fontFamily: fontFamily?.regular ?? defaultFontFamily.regular
      }
    },
    paragraph: {
      lg: {
        ...defaultTypography.paragraph.lg,
        fontFamily: fontFamily?.regular ?? defaultFontFamily.regular
      },
      md: {
        ...defaultTypography.paragraph.md,
        fontFamily: fontFamily?.regular ?? defaultFontFamily.regular
      },
      sm: {
        ...defaultTypography.paragraph.sm,
        fontFamily: fontFamily?.regular ?? defaultFontFamily.regular
      }
    },
    interactions: {
      xl: {
        ...defaultTypography.interactions.xl,
        fontFamily: fontFamily?.bold ?? defaultFontFamily.bold
      },
      lg: {
        ...defaultTypography.interactions.lg,
        fontFamily: fontFamily?.bold ?? defaultFontFamily.bold
      },
      md: {
        ...defaultTypography.interactions.md,
        fontFamily: fontFamily?.bold ?? defaultFontFamily.bold
      },
      sm: {
        ...defaultTypography.interactions.sm,
        fontFamily:
          fontFamily?.['extra-bold'] ?? defaultFontFamily['extra-bold']
      }
    },
    numbers: {
      xxl: {
        ...defaultTypography.numbers.xxl,
        fontFamily: fontFamily?.bold ?? defaultFontFamily.bold
      },
      xl: {
        ...defaultTypography.numbers.xl,
        fontFamily: fontFamily?.bold ?? defaultFontFamily.bold
      },
      lg: {
        ...defaultTypography.numbers.lg,
        fontFamily: fontFamily?.bold ?? defaultFontFamily.bold
      },
      md: {
        ...defaultTypography.numbers.md,
        fontFamily: fontFamily?.bold ?? defaultFontFamily.bold
      },
      sm: {
        ...defaultTypography.numbers.sm,
        fontFamily:
          fontFamily?.['extra-bold'] ?? defaultFontFamily['extra-bold']
      },
      xs: {
        ...defaultTypography.numbers.xs,
        fontFamily:
          fontFamily?.['extra-bold'] ?? defaultFontFamily['extra-bold']
      }
    }
  };
};
