/**
 * Property of Norman Palisoc (https://github.com/IAmArien)
 * Reuse as a whole or in part is prohibited without permission.
 */

import Svg, { Path } from 'react-native-svg';

import { IconProps } from './types';

export function SearchOutlinedIcon({ width = 24, height = 24, fillColor = '#77797B' }: IconProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        d="M15.755 14.255h-.79l-.28-.27a6.471 6.471 0 001.57-4.23 6.5 6.5 0 10-6.5 6.5c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99 1.49-1.49-4.99-5zm-6 0c-2.49 0-4.5-2.01-4.5-4.5s2.01-4.5 4.5-4.5 4.5 2.01 4.5 4.5-2.01 4.5-4.5 4.5z"
        fill={fillColor}
      />
    </Svg>
  );
}
