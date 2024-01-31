import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { SVGProps } from "@common/CommonTypes";

function SvgComponent(props: SVGProps) {
  const {
    width = 24,
    height = 24,
    color1 = "#6D6D6D",
    fill = "none",
    strokeWidth = 1.5,
  } = props;

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 25"
      fill={fill}
      {...props}>
      <Path
        d="M3.5 2.357h17M3.5 22.357h17"
        stroke={color1}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M5.5 22.357c1.333-6.67 3.5-10.003 6.5-10 3 .003 5.167 3.336 6.5 10h-13z"
        stroke={color1}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
      <Path
        d="M18.5 2.357c-1.333 6.67-3.5 10.003-6.5 10-3-.003-5.167-3.336-6.5-10h13z"
        stroke={color1}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default SvgComponent;
