import * as React from "react";
import { SVGProps } from "@common/CommonTypes";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";

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
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <G clipPath="url(#clip0_4584_10917)">
        <Path
          d="M12 22a9.97 9.97 0 007.071-2.929A9.97 9.97 0 0022 12a9.969 9.969 0 00-2.929-7.071A9.969 9.969 0 0012 2a9.969 9.969 0 00-7.071 2.929A9.969 9.969 0 002 12a9.969 9.969 0 002.929 7.071A9.969 9.969 0 0012 22z"
          stroke={color1}
          strokeWidth={1.5}
          strokeLinejoin="round"
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 5.5A1.25 1.25 0 1112 8a1.25 1.25 0 010-2.5z"
          fill={color1}
        />
        <Path
          d="M12.25 17v-7h-1M10.5 17H14"
          stroke={color1}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_4584_10917">
          <Path fill={color2} d="M0 0H24V24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default SvgComponent;
