import * as React from "react";
import { SVGProps } from "@common/CommonTypes";
import Svg, { Path } from "react-native-svg";
import { moderateScale } from "react-native-size-matters";

function SvgComponent(props: SVGProps) {
  const {
    width = 30,
    height = 30,
    color1 = "#394153",
    fill = "none",
    strokeWidth = 1.5,
  } = props;

  return (
    <Svg
      width={moderateScale(width, 0.3)}
      height={moderateScale(height, 0.3)}
      viewBox="0 0 20 20"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M17.75 1h-15a1.5 1.5 0 00-1.5 1.5v15a1.5 1.5 0 001.5 1.5h15a1.5 1.5 0 001.5-1.5v-15a1.5 1.5 0 00-1.5-1.5zM1.25 5h17M13.25 9h6M13.25 13h6M9.75 9h.5M9.75 13h.5M5.25 1v18"
        stroke={color1}
        strokeWidth={moderateScale(strokeWidth, 0.3)}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default SvgComponent;
