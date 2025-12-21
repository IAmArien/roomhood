/**
 * Property of Norman Palisoc (https://github.com/IAmArien)
 * Reuse as a whole or in part is prohibited without permission.
 */

import { ReactElement } from 'react';
import Svg, { Path } from 'react-native-svg';

import { IconProps } from './types';

export function CheckIcon({ testID, size = 24, color }: IconProps): ReactElement {
  return (
    <Svg testID={testID} width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M1 8a7 7 0 017-7h8a7 7 0 017 7v8a7 7 0 01-7 7H8a7 7 0 01-7-7V8z"
        fill={color}
        stroke="#CDE0FD"
        strokeWidth={2}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.707 9.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-2-2a1 1 0 
          111.414-1.414L11 12.586l3.293-3.293a1 1 0 011.414 0z"
        fill={'#fff'}
      />
    </Svg>
  );
}
