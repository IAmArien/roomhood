/**
 * Property of Norman Palisoc (https://github.com/IAmArien)
 * Reuse as a whole or in part is prohibited without permission.
 */

import { Platform } from 'react-native';

import { ThemeProperties } from '../../provider/types';
import { Properties } from '../../types/Theme';

/**
 * The default properties (radius/shadows) of the branding sdk theme.
 */
export const defaultProperties: Properties = {
  radius: {
    'less-round': 8,
    'round': 12,
    'rounder': 20,
    'roundest': 24
  },
  shadows: {
    softest: {
      shadowColor: Platform.OS === 'android' ? '#00000059' : '#d2d7db',
      shadowOffset: {
        width: 0,
        height: 0
      },
      shadowOpacity: 0.5,
      shadowRadius: 5,
      elevation: 8
    },
    softer: {
      shadowColor: Platform.OS === 'android' ? '#00000073' : '#d2d7db',
      shadowOffset: {
        width: 0,
        height: 0
      },
      shadowOpacity: 0.75,
      shadowRadius: 8,
      elevation: 13
    },
    soft: {
      shadowColor: Platform.OS === 'android' ? '#00000099' : '#d2d7db',
      shadowOffset: {
        width: 0,
        height: 0
      },
      shadowOpacity: 1,
      shadowRadius: 11,
      elevation: 18
    }
  }
};

/**
 * Handy function used to override the Properties object of the branding sdk theme.
 * Accepts params of `ThemeProperties` structured in a way to override the default
 * properties (radius/shadows) theme of the branding sdk.
 * @param colors Type of ThemeProperties
 * @see ThemeProperties
 * @returns Properties object of the branding sdk theme
 */
export const properties = (properties?: ThemeProperties): Properties => {
  return {
    radius: {
      'less-round':
        properties?.radius?.['less-round'] ??
        defaultProperties.radius['less-round'],
      'round': properties?.radius?.round ?? defaultProperties.radius.round,
      'rounder':
        properties?.radius?.rounder ?? defaultProperties.radius.rounder,
      'roundest':
        properties?.radius?.roundest ?? defaultProperties.radius.roundest
    },
    shadows: {
      softest:
        properties?.shadows?.softest ?? defaultProperties.shadows.softest,
      softer: properties?.shadows?.softer ?? defaultProperties.shadows.softer,
      soft: properties?.shadows?.soft ?? defaultProperties.shadows.soft
    }
  };
};
