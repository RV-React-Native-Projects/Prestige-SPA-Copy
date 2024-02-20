import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";
import { SVGProps } from "@common/CommonTypes";
import { moderateScale } from "react-native-size-matters";

function SvgComponent(props: SVGProps) {
  const {
    width = 20,
    height = 20,
    color1 = "#266EFF",
    color2 = "#FFF",
    color3 = "#266EFF",
    fill = "none",
  } = props;

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={moderateScale(width, 0.3)}
      height={moderateScale(height, 0.3)}
      viewBox="0 0 20 21"
      fill={fill}
      {...props}>
      <G
        clipPath="url(#clip0_4177_18156)"
        stroke={color1}
        strokeLinejoin="round">
        <Path
          d="M10 18.833s6.25-5 6.25-10.416a6.25 6.25 0 10-12.5 0c0 5.416 6.25 10.416 6.25 10.416z"
          fill={color3}
        />
        <Path d="M10 11.416a3 3 0 100-6 3 3 0 000 6z" fill={color2} />
      </G>
      <Defs>
        <ClipPath id="clip0_4177_18156">
          <Path fill={color2} transform="translate(0 .5)" d="M0 0H20V20H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default SvgComponent;
