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
        d="M16.5 26c5.523 0 10-4.477 10-10s-4.477-10-10-10-10 4.477-10 10 4.477 10 10 10z"
        stroke={color1}
        strokeWidth={strokeWidth}
      />
      <Path
        d="M16.5 6c-.05 3.334-.87 5.835-2.456 7.502-1.587 1.668-4.101 2.502-7.544 2.502"
        stroke={color1}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M26.484 16.503c-3.256-.224-5.744.472-7.464 2.088C17.3 20.206 16.46 22.676 16.5 26"
        stroke={color1}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export default SvgComponent;
