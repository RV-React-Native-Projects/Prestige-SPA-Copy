import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { SVGProps } from "@common/CommonTypes";

function SvgComponent(props: SVGProps) {
  const { width = 20, height = 20, color1 = "#FFFFFF", fill = "none" } = props;

  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 16 18"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M11.913 10.796a3.2 3.2 0 00-2 .7L6.48 9.351a3.233 3.233 0 000-1.4l3.432-2.14a3.208 3.208 0 10-1.136-1.817L5.343 6.14a3.214 3.214 0 100 5.03l3.431 2.144a3.215 3.215 0 103.138-2.516h.001z"
        fill={color1}
      />
    </Svg>
  );
}

export default SvgComponent;
