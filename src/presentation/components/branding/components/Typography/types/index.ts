/**
 * Property of Norman Palisoc (https://github.com/IAmArien)
 * Reuse as a whole or in part is prohibited without permission.
 */

import { StyleProp, TextProps, TextStyle } from 'react-native';

import { Theme } from '../../../types/Theme';

export type FontWeight = '400' | '600' | '700' | '800';

/**
 * Type string for the allowed headline sizes. Sizes available are:
 * `lg`, `md`, `sm`.
 */
export type HeadlineSize = 'lg' | 'md' | 'sm';

/**
 * Type string for the allowed title sizes. Sizes available are:
 * `semi-bold-xl`, `semi-bold-lg`, `semi-bold-md`, `semi-bold-sm`, `semi-bold-xs`,
 * `bold-xl`, `bold-lg`, `bold-md`, `bold-md`, `bold-sm`, `bold-xs`.
 */
export type TitleSize =
  | 'semi-bold-xl'
  | 'semi-bold-lg'
  | 'semi-bold-md'
  | 'semi-bold-sm'
  | 'semi-bold-xs'
  | 'bold-xl'
  | 'bold-lg'
  | 'bold-md'
  | 'bold-sm'
  | 'bold-xs';

/**
 * Type string for the allowed overline sizes. Sizes available are:
 * `xl`, `lg`, `md`, `sm`, `xs`.
 */
export type OverlineSize = 'xl' | 'lg' | 'md' | 'sm' | 'xs';

/**
 * Type string for the allowed description sizes. Sizes available are:
 * `lg`, `md`, `sm`, `xs`.
 */
export type DescriptionSize = 'lg' | 'md' | 'sm' | 'xs';

/**
 * Type string for the allowed paragraph sizes. Sizes available are:
 * `lg`, `md`, `sm`.
 */
export type ParagraphSize = 'lg' | 'md' | 'sm';

/**
 * Type string for the allowed interaction sizes. Sizes available are:
 * `xl`, `lg`, `md`, `sm`.
 */
export type InteractionsSize = 'xl' | 'lg' | 'md' | 'sm';

/**
 * Type string for the allowed interaction sizes. Sizes available are:
 * `xxl`, `xl`, `lg`, `md`, `sm`, `xs`.
 */
export type NumbersSize = 'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs';

/**
 * Type string for the allowed variants of Typography. Variants available are:
 * `headline`, `title`, `overline`, `description`, `paragraph`, `interactions`,
 * `numbers`.
 */
export type TypographyVariant =
  | 'headline'
  | 'title'
  | 'overline'
  | 'description'
  | 'paragraph'
  | 'interactions'
  | 'numbers';

/**
 * Type object for the default and common typography props.
 * @param color string value for the applying color for the typography text
 * @param customStyle StyleProp of TextStyle for providing the custom style of the
 * typography. When provided, the default style of the typography will be disregarded
 * @param textAlign string value to align the text of the typography
 * @param theme Theme object used as a fallback if Typograhy UI element will be used
 * outside the ThemeProvider
 * @see StyleProp
 * @see TextStyle
 */
export type DefaultTypographyProps = {
  /**
   * @param color string value for the applying color for the typography text
   */
  color?: string;
  /**
   * @param customStyle StyleProp of TextStyle for providing the custom style of the
   * typography. When provided, the default style of the typography will be disregarded
   */
  customStyle?: StyleProp<TextStyle>;
  /**
   * @param textAlign string value to align the text of the typography
   */
  textAlign?: TextStyle['textAlign'];
  /**
   * @param theme Theme object used as a fallback if Typograhy UI element will be used
   * outside the ThemeProvider
   */
  theme?: Theme;
  /**
   * @param fontWeight string value for applying fontWeight to the typography
   */
  fontWeight?: FontWeight;
};

/**
 * Type object for the overall props of the Typography
 * @param variant string value for the TypographyVariant
 * @param size Size object of the allowed sizes of the Typography. Sizes may vary depending
 * on the selected variant. Sizes could be: `HeadlineSize`, `TitleSize`, `OverlineSize`,
 * `DescriptionSize`, `ParagraphSize`, `InteractionsSize`, `NumbersSize`.
 * @see TextProps
 * @see HeadlineSize
 * @see TitleSize
 * @see OverlineSize
 * @see DescriptionSize
 * @see ParagraphSize
 * @see InteractionsSize
 * @see NumbersSize
 * @see TypographyVariant
 */
export type TypographyProps = (
  | ({
      /**
       * @param variant string value for the TypographyVariant
       */
      variant: 'headline';
      /**
       * @param size Size object of the allowed sizes of the Typography. Sizes may vary depending
       * on the selected variant. Sizes could be: `HeadlineSize`, `TitleSize`, `OverlineSize`,
       * `DescriptionSize`, `ParagraphSize`, `InteractionsSize`, `NumbersSize`.
       */
      size: HeadlineSize;
    } & DefaultTypographyProps)
  | ({
      /**
       * @param variant string value for the TypographyVariant
       */
      variant: 'title';
      /**
       * @param size Size object of the allowed sizes of the Typography. Sizes may vary depending
       * on the selected variant. Sizes could be: `HeadlineSize`, `TitleSize`, `OverlineSize`,
       * `DescriptionSize`, `ParagraphSize`, `InteractionsSize`, `NumbersSize`.
       */
      size: TitleSize;
    } & DefaultTypographyProps)
  | ({
      /**
       * @param variant string value for the TypographyVariant
       */
      variant: 'overline';
      /**
       * @param size Size object of the allowed sizes of the Typography. Sizes may vary depending
       * on the selected variant. Sizes could be: `HeadlineSize`, `TitleSize`, `OverlineSize`,
       * `DescriptionSize`, `ParagraphSize`, `InteractionsSize`, `NumbersSize`.
       */
      size: OverlineSize;
    } & DefaultTypographyProps)
  | ({
      /**
       * @param variant string value for the TypographyVariant
       */
      variant: 'description';
      /**
       * @param size Size object of the allowed sizes of the Typography. Sizes may vary depending
       * on the selected variant. Sizes could be: `HeadlineSize`, `TitleSize`, `OverlineSize`,
       * `DescriptionSize`, `ParagraphSize`, `InteractionsSize`, `NumbersSize`.
       */
      size: DescriptionSize;
    } & DefaultTypographyProps)
  | ({
      /**
       * @param variant string value for the TypographyVariant
       */
      variant: 'paragraph';
      /**
       * @param size Size object of the allowed sizes of the Typography. Sizes may vary depending
       * on the selected variant. Sizes could be: `HeadlineSize`, `TitleSize`, `OverlineSize`,
       * `DescriptionSize`, `ParagraphSize`, `InteractionsSize`, `NumbersSize`.
       */
      size: ParagraphSize;
    } & DefaultTypographyProps)
  | ({
      /**
       * @param variant string value for the TypographyVariant
       */
      variant: 'interactions';
      /**
       * @param size Size object of the allowed sizes of the Typography. Sizes may vary depending
       * on the selected variant. Sizes could be: `HeadlineSize`, `TitleSize`, `OverlineSize`,
       * `DescriptionSize`, `ParagraphSize`, `InteractionsSize`, `NumbersSize`.
       */
      size: InteractionsSize;
    } & DefaultTypographyProps)
  | ({
      /**
       * @param variant string value for the TypographyVariant
       */
      variant: 'numbers';
      /**
       * @param size Size object of the allowed sizes of the Typography. Sizes may vary depending
       * on the selected variant. Sizes could be: `HeadlineSize`, `TitleSize`, `OverlineSize`,
       * `DescriptionSize`, `ParagraphSize`, `InteractionsSize`, `NumbersSize`.
       */
      size: NumbersSize;
    } & DefaultTypographyProps)
) &
  TextProps;

export type TypographyPropsWithVariant<T extends TypographyVariant> = Extract<
  TypographyProps,
  { variant: T }
>;
