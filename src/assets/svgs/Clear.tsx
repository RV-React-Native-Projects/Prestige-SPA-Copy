import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { SVGProps } from "@common/CommonTypes";
import { moderateScale } from "react-native-size-matters";

function SvgComponent(props: SVGProps) {
  const { width = 20, height = 20, fill = "none", color1 = "#212225" } = props;
  return (
    <Svg
      width={moderateScale(width, 0.3)}
      height={moderateScale(height, 0.3)}
      viewBox="0 0 20 20"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 10C0 4.47 4.47 0 10 0s10 4.47 10 10-4.47 10-10 10S0 15.53 0 10zm10-1.41l1.89-1.89c.38-.38 1.02-.38 1.41 0 .39.39.39 1.02 0 1.41L11.41 10l1.89 1.89a.996.996 0 11-1.41 1.41L10 11.41 8.11 13.3a.996.996 0 11-1.41-1.41L8.59 10 6.7 8.11A.996.996 0 118.11 6.7L10 8.59z"
        fill={color1}
      />
    </Svg>
  );
}

export default SvgComponent;
