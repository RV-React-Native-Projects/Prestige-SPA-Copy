import * as React from "react";
import { SVGProps } from "@common/CommonTypes";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";
import { moderateScale } from "react-native-size-matters";

function SvgComponent(props: SVGProps) {
  const {
    width = 24,
    height = 24,
    color1 = "#6D6D6D",
    color2 = "#FFFFFF",
    fill = "none",
    strokeWidth = 1.5,
  } = props;

  return (
    <Svg
      width={moderateScale(width, 0.3)}
      height={moderateScale(height, 0.3)}
      viewBox="0 0 24 24"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <G
        clipPath="url(#clip0_4584_7563)"
        stroke={color1}
        strokeWidth={moderateScale(strokeWidth, 0.3)}
        strokeLinecap="round"
        strokeLinejoin="round">
        <Path d="M11.996 3H3v18h9M16.5 16.5L21 12l-4.5-4.5M8 11.996h13" />
      </G>
      <Defs>
        <ClipPath id="clip0_4584_7563">
          <Path fill={color2} d="M0 0H24V24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default SvgComponent;
