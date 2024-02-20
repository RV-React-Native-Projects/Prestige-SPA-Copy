import * as React from "react";
import { SVGProps } from "@common/CommonTypes";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";
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
      <G clipPath="url(#clip0_4033_18169)">
        <Path
          d="M10 5.333a7.333 7.333 0 00-7.333 7.334c0 7.333 8.666 14 13.333 15.55 4.667-1.55 13.333-8.217 13.333-15.55A7.333 7.333 0 0016 8.449a7.325 7.325 0 00-6-3.116z"
          stroke={color1}
          strokeWidth={moderateScale(strokeWidth, 0.3)}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_4033_18169">
          <Path fill={color2} d="M0 0H32V32H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default SvgComponent;
