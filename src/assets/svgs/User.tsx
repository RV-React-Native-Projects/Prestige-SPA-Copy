import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { SVGProps } from "@common/CommonTypes";
import { moderateScale } from "react-native-size-matters";

function SvgComponent(props: SVGProps) {
  const {
    height = 24,
    width = 24,
    color1 = "#6D6D6D",
    fill = "none",
    strokeWidth = 1.5,
  } = props || {};

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={moderateScale(width, 0.3)}
      height={moderateScale(height, 0.3)}
      viewBox="0 0 24 25"
      fill={fill}
      {...props}>
      <Path
        d="M12 10.786a4 4 0 100-8 4 4 0 000 8zM21 22.786a9 9 0 00-18 0"
        stroke={color1}
        strokeWidth={moderateScale(strokeWidth, 0.3)}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default SvgComponent;
