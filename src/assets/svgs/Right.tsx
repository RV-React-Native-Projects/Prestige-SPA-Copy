import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { SVGProps } from "@common/CommonTypes";
import { moderateScale } from "react-native-size-matters";

function SvgComponent(props: SVGProps) {
  const { width = 30, height = 30, color1 = "#394153", fill = "none" } = props;

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      height={moderateScale(height, 0.3)}
      width={moderateScale(width, 0.3)}
      viewBox="0 0 20 20"
      fill={fill}
      {...props}>
      <Path
        d="M6.91 14.41a.833.833 0 101.18 1.18l5-5a.833.833 0 000-1.18l-5-5a.833.833 0 00-1.18 1.18L11.322 10l-4.41 4.41z"
        fill={color1}
      />
    </Svg>
  );
}

export default SvgComponent;
