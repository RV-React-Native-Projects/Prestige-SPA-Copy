import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";
import { SVGProps } from "@common/CommonTypes";

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
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <G
        clipPath="url(#clip0_4584_16585)"
        stroke={color1}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round">
        <Path d="M2 19h20M5 19V9a7 7 0 1114 0v10H5zM12 22a2.5 2.5 0 002.5-2.5V19h-5v.5A2.5 2.5 0 0012 22z" />
      </G>
      <Defs>
        <ClipPath id="clip0_4584_16585">
          <Path fill={color2} d="M0 0H24V24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default SvgComponent;
