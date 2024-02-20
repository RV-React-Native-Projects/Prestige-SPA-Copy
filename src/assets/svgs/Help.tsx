import { SVGProps } from "@src/common/CommonTypes";
import * as React from "react";
import { moderateScale } from "react-native-size-matters";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";

function SvgComponent(props: SVGProps) {
  const {
    width = 16,
    height = 16,
    color1 = "#2094E9",
    color2 = "#FFFFFF",
    fill = "none",
  } = props;

  return (
    <Svg
      width={moderateScale(width, 0.3)}
      height={moderateScale(height, 0.3)}
      viewBox="0 0 16 16"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <G clipPath="url(#clip0_3879_59406)">
        <Path
          d="M7.332 12h1.333v-1.333H7.332v1.334zm.667-10.666a6.67 6.67 0 00-6.667 6.667 6.67 6.67 0 006.667 6.666 6.67 6.67 0 006.666-6.666A6.67 6.67 0 008 1.334zm0 12a5.34 5.34 0 01-5.334-5.333A5.34 5.34 0 018 2.667a5.34 5.34 0 015.333 5.334 5.34 5.34 0 01-5.333 5.333zm0-9.333a2.666 2.666 0 00-2.667 2.666h1.333c0-.733.6-1.333 1.334-1.333.733 0 1.333.6 1.333 1.333 0 1.334-2 1.167-2 3.334h1.333c0-1.5 2-1.667 2-3.334A2.666 2.666 0 008 4.001z"
          fill={color1}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_3879_59406">
          <Path fill={color2} d="M0 0H16V16H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default SvgComponent;
