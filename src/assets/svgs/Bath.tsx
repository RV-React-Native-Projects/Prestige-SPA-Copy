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
      viewBox="0 0 20 20"
      fill={fill}
      {...props}>
      <Path
        d="M6.628 7.672a1.668 1.668 0 100-3.336 1.668 1.668 0 000 3.336z"
        fill="#1A295B"
      />
      <Path
        d="M17.471 11.01V4.195a2.358 2.358 0 00-4.029-1.668L12.4 3.57a1.418 1.418 0 00-.425-.067c-.32 0-.632.093-.9.267l2.3 2.3c.174-.268.267-.58.267-.9a1.799 1.799 0 00-.058-.425l1.043-1.043a.69.69 0 011.176.492v6.814H10.09a4.26 4.26 0 01-.684-.6L8.238 9.117a1.789 1.789 0 00-.58-.418 1.878 1.878 0 00-2.7 1.685v.626h-2.5v5a1.673 1.673 0 001.668 1.668.837.837 0 00.834.834h11.677a.837.837 0 00.834-.834 1.673 1.673 0 001.668-1.668v-5h-1.668zm0 5H4.126v-3.332h13.345v3.332z"
        fill={color1}
      />
    </Svg>
  );
}

export default SvgComponent;
