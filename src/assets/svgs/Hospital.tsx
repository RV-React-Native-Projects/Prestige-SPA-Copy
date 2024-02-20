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
      viewBox="0 0 14 15"
      fill={fill}
      {...props}>
      <Path
        d="M11.083 2.25H2.917a1.167 1.167 0 00-1.16 1.167l-.007 8.166a1.167 1.167 0 001.167 1.167h8.166a1.167 1.167 0 001.167-1.167V3.417a1.167 1.167 0 00-1.167-1.167zM9.917 8.667h-1.75v1.75a.585.585 0 01-.584.583H6.417a.585.585 0 01-.584-.583v-1.75h-1.75a.585.585 0 01-.583-.584V6.917a.585.585 0 01.583-.584h1.75v-1.75A.585.585 0 016.417 4h1.166a.585.585 0 01.584.583v1.75h1.75a.585.585 0 01.583.584v1.166a.585.585 0 01-.583.584z"
        fill={color1}
      />
    </Svg>
  );
}

export default SvgComponent;
