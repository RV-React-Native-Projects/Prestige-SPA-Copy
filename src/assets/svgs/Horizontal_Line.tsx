import { SVGProps } from "@common/CommonTypes";
import * as React from "react";
import { moderateScale } from "react-native-size-matters";
import Svg, { Line } from "react-native-svg";

function SvgComponent(props: SVGProps) {
  const { height = 3, width = 200, color1 = "#A8A8A8" } = props || {};
  return (
    <Svg
      height={moderateScale(height, 0.3)}
      width={width}
      style={{ alignSelf: "center" }}>
      <Line
        stroke={color1}
        strokeWidth={width}
        strokeDasharray={(moderateScale(8, 0.3), moderateScale(5, 0.3))}
        x1={width}
        y1="0"
        x2="0"
        y2={moderateScale(height, 0.3)}
      />
    </Svg>
  );
}

export default SvgComponent;
