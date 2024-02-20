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
      viewBox="0 0 21 20"
      fill={fill}
      {...props}>
      <Path
        d="M17.91 8.985V6.668a2.507 2.507 0 00-2.5-2.5h-3.333a2.478 2.478 0 00-1.667.65 2.478 2.478 0 00-1.666-.65H5.41a2.507 2.507 0 00-2.5 2.5v2.317a2.488 2.488 0 00-.833 1.85v5h1.667v-1.667h13.333v1.667h1.667v-5a2.488 2.488 0 00-.834-1.85zm-5.833-3.15h3.333a.836.836 0 01.833.833v1.667h-5V6.668a.836.836 0 01.834-.833zm-7.5.833a.836.836 0 01.833-.833h3.334a.836.836 0 01.833.833v1.667h-5V6.668zm-.833 5.833v-1.666a.836.836 0 01.833-.833h11.667a.836.836 0 01.833.833v1.667l-13.333-.001z"
        fill={color1}
      />
    </Svg>
  );
}

export default SvgComponent;
