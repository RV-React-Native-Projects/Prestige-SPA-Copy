import { SVGProps } from "@src/common/CommonTypes";
import * as React from "react";
import Svg, { Path } from "react-native-svg";

function SvgComponent(props: SVGProps) {
  const {
    width = 30,
    height = 30,
    color1 = "#595959",
    color2 = "#1A295B",
    fill = "none",
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
        d="M8.625 25V13l-2.5 2 10-8 10 8-2.5-2v12h-15z"
        stroke={color1}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M13.625 18.5V25h5v-6.5h-5z"
        stroke={color1}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
      <Path
        d="M8.625 25h15"
        stroke={color1}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export default SvgComponent;
