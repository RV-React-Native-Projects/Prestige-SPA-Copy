import { SVGProps } from "@common/CommonTypes";
import * as React from "react";
import { moderateScale } from "react-native-size-matters";
import Svg, { Path } from "react-native-svg";

function SvgComponent(props: SVGProps) {
  const {
    width = 30,
    height = 30,
    fill = "none",
    color1 = "#6D6D6D",
    color2 = "#FFFFFF",
    strokeWidth = 1.5,
  } = props;

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={moderateScale(width, 0.3)}
      height={moderateScale(height, 0.3)}
      viewBox="0 0 33 32"
      fill={fill}
      {...props}>
      <Path
        d="M18 9.5H6.5v4H12a6.394 6.394 0 00-.5 2.5 6.48 6.48 0 006.5 6.5c3.6 0 6.5-2.895 6.5-6.5A6.48 6.48 0 0018 9.5zM18 9.5v3M24.5 16h2"
        stroke={color1}
        strokeWidth={moderateScale(strokeWidth, 0.3)}
        strokeMiterlimit={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default SvgComponent;
