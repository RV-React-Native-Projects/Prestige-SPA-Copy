import * as React from "react";
import { moderateScale } from "react-native-size-matters";
import Svg, { Line } from "react-native-svg";
import { SVGProps } from "@common/CommonTypes";

function SvgComponent(props: SVGProps) {
  const { height = 100, width = 4, color1 = "#A8A8A8", style } = props || {};
  return (
    <Svg
      height={moderateScale(height, 0.3)}
      width={moderateScale(width, 0.3)}
      style={[
        {
          alignSelf: "center",
        },
        { ...style },
      ]}>
      <Line
        stroke={color1}
        strokeWidth={moderateScale(width, 0.3)}
        strokeDasharray={(moderateScale(8, 0.3), moderateScale(4, 0.3))}
        x1="0"
        y1="0"
        x2="0"
        y2={moderateScale(height, 0.3)}
      />
    </Svg>
  );
}

export default SvgComponent;
