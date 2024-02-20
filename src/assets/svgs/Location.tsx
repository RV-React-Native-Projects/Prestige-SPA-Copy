import { SVGProps } from "@src/common/CommonTypes";
import * as React from "react";
import { moderateScale } from "react-native-size-matters";
import Svg, { Path } from "react-native-svg";

function SvgComponent(props: SVGProps) {
  const { width = 30, height = 30, color1 = "#595959", fill = "none" } = props;

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={moderateScale(width, 0.3)}
      height={moderateScale(height, 0.3)}
      viewBox="0 0 12 18"
      fill={fill}
      {...props}>
      <Path
        d="M5.563.281A5.63 5.63 0 001.63 1.88 5.39 5.39 0 000 5.73c0 5.45 5.567 11.987 5.567 11.987s5.568-6.538 5.568-11.987c0-.716-.144-1.425-.424-2.086a5.442 5.442 0 00-1.208-1.768A5.577 5.577 0 007.695.695 5.673 5.673 0 005.563.28zm0 8.786a3.462 3.462 0 01-1.894-.562 3.354 3.354 0 01-1.256-1.498A3.271 3.271 0 012.22 5.08a3.316 3.316 0 01.933-1.708 3.433 3.433 0 011.746-.914 3.478 3.478 0 011.97.19c.623.253 1.156.68 1.53 1.23.375.548.575 1.193.575 1.853 0 .885-.36 1.734-.999 2.36a3.447 3.447 0 01-2.41.977zM3.41 5.73c0-.417.126-.826.363-1.173.237-.347.574-.618.969-.777a2.2 2.2 0 011.246-.12c.419.082.803.283 1.105.579a2.07 2.07 0 01.466 2.302c-.164.385-.441.714-.796.946a2.19 2.19 0 01-2.723-.265 2.088 2.088 0 01-.63-1.492z"
        fill={color1}
      />
    </Svg>
  );
}

export default SvgComponent;
