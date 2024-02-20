import { SVGProps } from "@src/common/CommonTypes";
import * as React from "react";
import { moderateScale } from "react-native-size-matters";
import Svg, { Path } from "react-native-svg";

function SvgComponent(props: SVGProps) {
  const { width = 30, height = 30, color1 = "#1A295B", fill = "none" } = props;
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={moderateScale(width, 0.3)}
      height={moderateScale(height, 0.3)}
      viewBox="0 0 14 15"
      fill={fill}
      {...props}>
      <Path
        d="M7 1.666c-2.333 0-4.667.292-4.667 2.333v5.542a2.044 2.044 0 002.042 2.042l-.671.67a.292.292 0 00.21.496h.636a.273.273 0 00.204-.088l1.08-1.078h2.333l1.08 1.08a.296.296 0 00.203.087h.636a.288.288 0 00.205-.496l-.665-.67a2.044 2.044 0 002.04-2.043V3.999c0-2.041-2.333-2.333-4.666-2.333zm-2.625 8.75a.875.875 0 110-1.75.875.875 0 010 1.75zm2.042-4.083H3.5V3.999h2.917v2.334zm3.208 4.083a.875.875 0 110-1.75.875.875 0 010 1.75zm.875-4.083H7.583V3.999H10.5v2.334z"
        fill={color1}
      />
    </Svg>
  );
}

export default SvgComponent;
