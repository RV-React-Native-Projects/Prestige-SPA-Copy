import { SVGProps } from "@src/common/CommonTypes";
import * as React from "react";
import Svg, { Path } from "react-native-svg";

function SvgComponent(props: SVGProps) {
  const {
    width = 30,
    height = 30,
    color1 = "#394153",
    color2 = "#394153",
    fill = "none",
    strokeWidth = 0.160976,
  } = props;

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 16 17"
      fill={fill}
      {...props}>
      <Path
        d="M10.64 2.76a.795.795 0 00-1.128 0L4.217 8.053a.635.635 0 000 .899l5.295 5.295a.796.796 0 001.127 0 .796.796 0 000-1.128L6.026 8.5l4.62-4.62a.794.794 0 00-.007-1.12z"
        fill={color1}
        stroke={color2}
        strokeWidth={strokeWidth}
      />
    </Svg>
  );
}

export default SvgComponent;
