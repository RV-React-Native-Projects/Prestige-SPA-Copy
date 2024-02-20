import * as React from "react";
import { SVGProps } from "@common/CommonTypes";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";
import { moderateScale } from "react-native-size-matters";

function SvgComponent(props: SVGProps) {
  const {
    width = 24,
    height = 24,
    color1 = "#6D6D6D",
    color2 = "#FFFFFF",
    fill = "none",
    strokeWidth = 1.5,
  } = props;

  return (
    <Svg
      width={moderateScale(width, 0.3)}
      height={moderateScale(height, 0.3)}
      viewBox="0 0 24 24"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <G
        clipPath="url(#clip0_4584_8376)"
        stroke={color1}
        strokeWidth={moderateScale(strokeWidth, 0.3)}
        strokeLinejoin="round">
        <Path d="M9.142 21.585a9.997 9.997 0 01-4.348-2.652 3 3 0 00-2.59-4.919A10.044 10.044 0 012.457 9H2.5a3 3 0 002.692-4.325A9.984 9.984 0 019.326 2.36a3 3 0 005.348 0 9.984 9.984 0 014.134 2.314A3 3 0 0021.542 9a10.044 10.044 0 01.255 5.015 3 3 0 00-2.59 4.919 9.998 9.998 0 01-4.349 2.651 3.001 3.001 0 00-5.716 0z" />
        <Path d="M12 15.5a3.5 3.5 0 100-7 3.5 3.5 0 000 7z" />
      </G>
      <Defs>
        <ClipPath id="clip0_4584_8376">
          <Path fill={color2} d="M0 0H24V24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default SvgComponent;
