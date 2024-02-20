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
      viewBox="0 0 20 20"
      fill={fill}
      {...props}>
      <Path
        d="M15.71 5.172H4.035A1.673 1.673 0 002.366 6.84v6.673a1.673 1.673 0 001.668 1.668H15.71a1.673 1.673 0 001.668-1.668V6.84a1.673 1.673 0 00-1.668-1.668zm0 8.34H4.035V6.84H15.71v6.673z"
        fill={color1}
      />
    </Svg>
  );
}

export default SvgComponent;
