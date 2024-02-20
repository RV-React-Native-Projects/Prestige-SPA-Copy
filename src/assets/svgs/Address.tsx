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
        clipPath="url(#clip0_4584_2829)"
        stroke={color1}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round">
        <Path d="M4 18v4h16V2H4v4M3 15h2M3 12h2M3 9h2" />
        <Path d="M12 10.5a2 2 0 100-4 2 2 0 000 4zM16 17.5a4 4 0 10-8 0" />
      </G>
      <Defs>
        <ClipPath id="clip0_4584_2829">
          <Path fill={color2} d="M0 0H24V24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default SvgComponent;
