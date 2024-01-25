import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { SVGProps } from "@common/CommonTypes";

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
      width={width}
      height={height}
      viewBox="0 0 33 32"
      fill={fill}
      {...props}>
      <Path
        d="M11.5 21a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM21.5 21a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM16.5 11a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM16.5 26a5 5 0 00-10 0M26.5 26a5 5 0 00-10 0M21.5 16a5 5 0 00-10 0"
        stroke={color1}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default SvgComponent;
