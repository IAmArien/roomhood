/**
 * Property of Norman Palisoc (https://github.com/IAmArien)
 * Reuse as a whole or in part is prohibited without permission.
 */

import { ReactElement } from 'react';
import Svg, { Path } from 'react-native-svg';

import { IconProps } from './types';

export function EmailOutlinedIcon({
  width = 24,
  height = 24,
  fillColor = '#000',
}: IconProps): ReactElement {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0l-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z"
        fill={fillColor}
      />
    </Svg>
  );
}
