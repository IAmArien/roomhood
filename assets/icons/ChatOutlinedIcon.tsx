/**
 * Property of Norman Palisoc (https://github.com/IAmArien)
 * Reuse as a whole or in part is prohibited without permission.
 */

import Svg, { Path } from 'react-native-svg';

import { IconProps } from './types';

export function ChatOutlinedIcon({ width = 24, height = 24, fillColor = '#77797B' }: IconProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        d="M4 4h16v12H5.17L4 17.17V4zm0-2c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2H4zm2 10h12v2H6v-2zm0-3h12v2H6V9zm0-3h12v2H6V6z"
        fill={fillColor}
      />
    </Svg>
  );
}
