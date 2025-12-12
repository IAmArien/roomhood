/**
 * Property of Norman Palisoc (https://github.com/IAmArien)
 * Reuse as a whole or in part is prohibited without permission.
 */

// @ts-ignore
import React, { JSX } from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';

export function WarningIcon({
  testID = 'assets-warning-icon',
  color = '#F58928',
  size = 24
}: Readonly<IconProps>): JSX.Element {
  return (
    <Svg
      testID={testID}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none">
      <Path
        d="M9.31638 4.6595C10.4218 2.44772 13.578 2.44773 14.6834 4.65953L20.6803 16.6588C21.6771 18.6535 20.2266 20.9999 17.9967 20.9999H6.0029C3.77298 20.9999 2.32248 18.6534 3.31937 16.6588L9.31638 4.6595Z"
        fill={color}
      />
      <Path
        d="M12 8C11.4477 8 11 8.44772 11 9V13C11 13.5523 11.4477 14 12 14C12.5523 14 13 13.5523 13 13V9C13 8.44772 12.5523 8 12 8Z"
        fill="white"
      />
      <Path
        d="M12 15C11.4477 15 11 15.4477 11 16C11 16.5523 11.4477 17 12 17C12.5523 17 13 16.5523 13 16C13 15.4477 12.5523 15 12 15Z"
        fill="white"
      />
    </Svg>
  );
}
