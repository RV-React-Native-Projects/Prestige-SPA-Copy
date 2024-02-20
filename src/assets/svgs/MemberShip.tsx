import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";
import { SVGProps } from "@common/CommonTypes";
import { moderateScale } from "react-native-size-matters";

function SvgComponent(props: SVGProps) {
  const {
    width = 26,
    height = 26,
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
        clipPath="url(#clip0_4584_10865)"
        stroke={color1}
        strokeWidth={moderateScale(strokeWidth, 0.3)}
        strokeLinecap="round"
        strokeLinejoin="round">
        <Path d="M11.552 10.409a.5.5 0 01.896 0l1.493 3.024a.5.5 0 00.376.273l3.338.485a.5.5 0 01.277.853l-2.415 2.354a.5.5 0 00-.144.443l.57 3.324a.5.5 0 01-.725.527l-2.985-1.57a.5.5 0 00-.466 0l-2.985 1.57a.5.5 0 01-.725-.527l.57-3.324a.5.5 0 00-.144-.443l-2.415-2.354a.5.5 0 01.277-.853l3.338-.485a.5.5 0 00.376-.273l1.493-3.024zM18 2H6v5l6 2.5L18 7V2z" />
      </G>
      <Defs>
        <ClipPath id="clip0_4584_10865">
          <Path fill={color2} d="M0 0H24V24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default SvgComponent;
