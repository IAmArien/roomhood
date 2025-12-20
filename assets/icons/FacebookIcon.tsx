/**
 * Property of Norman Palisoc (https://github.com/IAmArien)
 * Reuse as a whole or in part is prohibited without permission.
 */

import { ReactElement } from "react";
import Svg, { Circle, Defs, LinearGradient, Path, Stop } from "react-native-svg";

export function FacebookIcon(): ReactElement {
  return (
    <Svg
      width={32}
      height={32}
      viewBox="0 0 32 32"
      fill="none">
      <Circle cx={16} cy={16} r={14} fill="url(#paint0_linear_53_168)" />
      <Path
        d="M21.214 20.282l.622-3.952h-3.89v-2.563c0-1.081.542-2.136 2.284-2.136H22V8.267S20.395 8 18.86 8c-3.205 0-5.298 1.893-5.298 5.318v3.012H10v3.952h3.562v9.552a14.468 14.468 0 004.383 0v-9.552h3.269z"
        fill="#fff"
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_53_168"
          x1={16}
          y1={2}
          x2={16}
          y2={29.917}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#18ACFE" />
          <Stop offset={1} stopColor="#0163E0" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}
