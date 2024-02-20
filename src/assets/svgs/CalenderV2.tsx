import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { SVGProps } from "@common/CommonTypes";
import { moderateScale } from "react-native-size-matters";

function SvgComponent(props: SVGProps) {
  const {
    width = 30,
    height = 30,
    fill = "none",
    color1 = "#6D6D6D",
    color2 = "#FFFFFF",
    strokeWidth = 1.5,
  } = props;

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={moderateScale(width, 0.3)}
      height={moderateScale(height, 0.3)}
      viewBox="0 0 33 32"
      fill={fill}
      {...props}>
      <Path
        d="M7 13.5h19V24a1 1 0 01-1 1H8a1 1 0 01-1-1V13.5zM7 8.5a1 1 0 011-1h17a1 1 0 011 1v5H7v-5z"
        stroke={color1}
        strokeWidth={moderateScale(strokeWidth, 0.3)}
        strokeLinejoin="round"
      />
      <Path
        d="M12.5 6v4M20.5 6v4M10.5 21h2M20.5 17h2M10.5 17h2M15.5 17h2"
        stroke={color1}
        strokeWidth={moderateScale(strokeWidth, 0.3)}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default SvgComponent;
