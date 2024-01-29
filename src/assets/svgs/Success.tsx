import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";
import { SVGProps } from "@common/CommonTypes";

function SvgComponent(props: SVGProps) {
  const {
    width = 75,
    height = 75,
    color1 = "#97C583",
    color2 = "#4C9A2A",
    color = "#FEFEFE",
    fill = "none",
  } = props;

  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 75 76"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Circle cx={37.5} cy={38} r={37.5} fill={color1} />
      <Circle cx={38} cy={38.5} r={30} fill={color2} />
      <Path
        d="M49.458 49H25.542v-3h23.916v3zm-15.375-6.87l-6.833-6 2.409-2.115 4.424 3.87L45.341 28l2.409 2.13-13.667 12z"
        fill={color}
      />
    </Svg>
  );
}

export default SvgComponent;
