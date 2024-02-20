import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";
import { SVGProps } from "@common/CommonTypes";
import { moderateScale } from "react-native-size-matters";

function SvgComponent(props: SVGProps) {
  const {
    width = 30,
    height = 30,
    color1 = "#6D6D6D",
    color2 = "#FFFFFF",
    fill = "none",
    strokeWidth = 1.5,
  } = props;

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={moderateScale(width, 0.3)}
      height={moderateScale(height, 0.3)}
      viewBox="0 0 32 32"
      fill={fill}
      {...props}>
      <G
        clipPath="url(#clip0_4033_18174)"
        stroke={color1}
        strokeWidth={moderateScale(strokeWidth, 0.3)}
        strokeLinecap="round"
        strokeLinejoin="round">
        <Path d="M2.667 25.333h26.666m-22.666 0V12a9.333 9.333 0 1118.666 0v13.333H6.667zM16 29.333A3.333 3.333 0 0019.333 26v-.667h-6.666V26A3.333 3.333 0 0016 29.333z" />
      </G>
      <Defs>
        <ClipPath id="clip0_4033_18174">
          <Path fill={color2} d="M0 0H32V32H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default SvgComponent;
