import { SVGProps } from "@src/common/CommonTypes";
import * as React from "react";
import { moderateScale } from "react-native-size-matters";
import Svg, { Path } from "react-native-svg";

function SvgComponent(props: SVGProps) {
  const {
    width = 30,
    height = 30,
    color1 = "#6D6D6D",
    color2 = "#4C9A2A",
    fill = "none",
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
        d="M8.625 25V13l-2.5 2 10-8 10 8-2.5-2v12h-15z"
        stroke={color1}
        strokeWidth={moderateScale(strokeWidth, 0.3)}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M13.625 18.5V25h5v-6.5h-5z"
        stroke={color1}
        strokeWidth={moderateScale(strokeWidth, 0.3)}
        strokeLinejoin="round"
      />
      <Path
        d="M8.625 25h15"
        stroke={color1}
        strokeWidth={moderateScale(strokeWidth, 0.3)}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export default SvgComponent;
