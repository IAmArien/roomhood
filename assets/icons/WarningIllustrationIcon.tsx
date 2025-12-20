/**
 * Property of Norman Palisoc (https://github.com/IAmArien)
 * Reuse as a whole or in part is prohibited without permission.
 */

import { ReactElement } from "react";
import Svg, { ClipPath, Defs, G, Path } from "react-native-svg";

export function WarningIllustrationIcon(): ReactElement {
  return (
    <Svg
      width={70}
      viewBox="0 0 375 374.999991"
      height={70}>
      <Defs>
        <ClipPath id="a">
          <Path d="M45 63h285v254.25H45zm0 0" />
        </ClipPath>
      </Defs>
      <G clipPath="url(#a)">
        <Path
          fill="#f9af40"
          d="M158.887 79.773L50.383 267.711c-12.711 22.02 3.18 49.547 28.605 49.547h217.008c25.43 0 41.32-27.528 28.61-49.547L216.097 79.773c-12.715-22.02-44.496-22.02-57.211 0L50.383 267.711c-12.711 22.02 3.18 49.547 28.605 49.547h217.008c25.43 0 41.32-27.528 28.61-49.547L216.097 79.773c-12.715-22.02-44.496-22.02-57.211 0"
        />
      </G>
      <Path
        fill="#2e2b30"
        d="M194.316 244.89l14.696-113.218c.593-3.625-2.703-6.86-6.98-6.86h-29.075c-4.117 0-7.36 3.004-7.027 6.516l14.375 113.219c.683 7.176 12.847 7.476 14.011.344M205.484 273.164c0 9.938-8.054 17.988-17.988 17.988-9.937 0-17.992-8.05-17.992-17.988 0-9.934 8.055-17.992 17.992-17.992 9.934 0 17.988 8.058 17.988 17.992"
      />
    </Svg>
  );
}
