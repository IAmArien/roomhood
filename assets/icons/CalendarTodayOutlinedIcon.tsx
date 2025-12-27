/**
 * Property of Norman Palisoc (https://github.com/IAmArien)
 * Reuse as a whole or in part is prohibited without permission.
 */

import { ReactElement } from 'react';
import Svg, { Path } from 'react-native-svg';

import { IconProps } from './types';

export function CalendarTodayOutlinedIcon({
  width = 24,
  height = 24,
  fillColor = '#000',
}: IconProps): ReactElement {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        d="M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H4V10h16v11zm0-13H4V5h16v3z"
        fill={fillColor}
      />
    </Svg>
  );
}
