import { SVGProps } from "@common/CommonTypes";
import * as React from "react";
import Svg, { Path } from "react-native-svg";

function SvgComponent(props: SVGProps) {
  const { width = 10, height = 5, color1 = "#868686", fill = "none" } = props;

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 10 5"
      fill={fill}
      {...props}>
      <Path d="M.833.334L5 4.501 9.167.334H.833z" fill={color1} />
    </Svg>
  );
}

export default SvgComponent;
