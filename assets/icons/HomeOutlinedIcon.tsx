/**
 * Property of Norman Palisoc (https://github.com/IAmArien)
 * Reuse as a whole or in part is prohibited without permission.
 */

import Svg, { Path } from 'react-native-svg';

import { IconProps } from './types';

export function HomeOutlinedIcon({ width = 24, height = 24, fillColor = '#77797B' }: IconProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 6.19l5 4.5v7.81h-2v-6H9v6H7v-7.81l5-4.5zm0-2.69l-10 9h3v8h6v-6h2v6h6v-8h3l-10-9z"
        fill={fillColor}
      />
    </Svg>
  );
}
