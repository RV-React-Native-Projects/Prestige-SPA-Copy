import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { SVGProps } from "@common/CommonTypes";

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
      width={width}
      height={height}
      viewBox="0 0 20 18"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M5.7 1A4.95 4.95 0 00.75 5.95c0 4.95 5.85 9.45 9 10.497 3.15-1.047 9-5.547 9-10.497a4.95 4.95 0 00-9-2.847A4.944 4.944 0 005.7 1z"
        stroke={color1}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default SvgComponent;
