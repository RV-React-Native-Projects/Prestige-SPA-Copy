import { SVGProps } from "@src/common/CommonTypes";
import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";

function SvgComponent(props: SVGProps) {
  const {
    width = 15,
    height = 15,
    fill = "none",
    color1 = "#FFB800",
    color2 = "#3C9AFB",
    color3 = "#FFFFFF",
  } = props;

  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 10 9"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <G
        clipPath="url(#clip0_4643_15069)"
        strokeWidth={0.55191}
        strokeLinecap="round"
        strokeLinejoin="round">
        <Path
          d="M4.952 3.915a.184.184 0 01.33 0l.55 1.113a.184.184 0 00.138.1l1.228.179c.15.022.21.207.102.314l-.889.866a.184.184 0 00-.053.163l.21 1.223a.184.184 0 01-.267.194l-1.098-.578a.184.184 0 00-.172 0l-1.098.578a.184.184 0 01-.267-.194l.21-1.223a.184.184 0 00-.053-.163l-.889-.866a.184.184 0 01.102-.314l1.228-.179a.184.184 0 00.139-.1l.55-1.113z"
          fill={color1}
          stroke={color1}
        />
        <Path
          d="M7.325.821H2.909v1.84l2.208.92 2.208-.92V.821z"
          fill={color2}
          stroke={color2}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_4643_15069">
          <Path
            fill={color3}
            transform="translate(.702 .085)"
            d="M0 0H8.83057V8.83057H0z"
          />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default SvgComponent;
