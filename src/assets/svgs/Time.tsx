import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";
import { SVGProps } from "@common/CommonTypes";
import { moderateScale } from "react-native-size-matters";

function SvgComponent(props: SVGProps) {
  const {
    width = 30,
    height = 30,
    color1 = "#266EFF",
    color2 = "#ffffff",
    fill = "none",
  } = props;

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={moderateScale(width, 0.3)}
      height={moderateScale(height, 0.3)}
      viewBox="0 0 14 14"
      fill="none"
      {...props}>
      <G
        clipPath="url(#clip0_4357_862)"
        strokeWidth={1.16667}
        strokeLinejoin="round">
        <Path
          d="M7 12.833A5.833 5.833 0 107 1.166a5.833 5.833 0 000 11.667z"
          fill={color1}
          stroke={color1}
        />
        <Path
          d="M7.002 3.5v3.503l2.473 2.473"
          stroke={color2}
          strokeLinecap="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_4357_862">
          <Path fill={color2} d="M0 0H14V14H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default SvgComponent;
