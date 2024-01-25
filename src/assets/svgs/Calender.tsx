import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";
import { SVGProps } from "@src/common/CommonTypes";

function SvgComponent(props: SVGProps) {
  const {
    width = 30,
    height = 30,
    fill = "none",
    color1 = "#868686",
    color2 = "#FFFFFF",
  } = props;
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 20 21"
      fill={fill}
      {...props}>
      <G clipPath="url(#clip0_3848_3346)">
        <Path
          d="M16.667 2.835h-.834V1.168h-1.666v1.667H5.833V1.168H4.167v1.667h-.834c-.916 0-1.666.75-1.666 1.666v13.334c0 .916.75 1.666 1.666 1.666h13.334c.916 0 1.666-.75 1.666-1.666V4.5c0-.916-.75-1.666-1.666-1.666zm0 15H3.333V7h13.334v10.834z"
          fill={color1}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_3848_3346">
          <Path fill={color2} transform="translate(0 .334)" d="M0 0H20V20H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default SvgComponent;
