import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { SVGProps } from "@common/CommonTypes";

function SvgComponent(props: SVGProps) {
  const {
    width = 15,
    height = 15,
    fill = "none",
    color1 = "#266EFF",
    color2 = "#FFFFFF",
    strokeWidth = 1.5,
  } = props;

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 14 14"
      fill={fill}
      {...props}>
      <Path
        d="M7.875 3.208H1.167v2.334h3.208A3.73 3.73 0 004.083 7a3.78 3.78 0 003.792 3.792c2.1 0 3.792-1.69 3.792-3.792a3.78 3.78 0 00-3.792-3.792z"
        fill={color1}
        stroke={color1}
        strokeMiterlimit={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M7.875 3.208v1.75"
        stroke={color2}
        strokeMiterlimit={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M11.667 7h1.166"
        stroke={color1}
        strokeMiterlimit={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default SvgComponent;
