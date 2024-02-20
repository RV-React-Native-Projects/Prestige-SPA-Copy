import { SVGProps } from "@src/common/CommonTypes";
import * as React from "react";
import { moderateScale } from "react-native-size-matters";
import Svg, { Path } from "react-native-svg";

function SvgComponent(props: SVGProps) {
  const { width = 20, height = 20, color1 = "#868686", fill = "none" } = props;

  return (
    <Svg
      width={moderateScale(width, 0.3)}
      height={moderateScale(height, 0.3)}
      viewBox="0 0 20 17"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M10 3.833c2.3 0 4.167 1.867 4.167 4.167 0 .542-.109 1.05-.3 1.525l2.433 2.433A9.848 9.848 0 0019.158 8c-1.441-3.658-5-6.25-9.166-6.25a9.704 9.704 0 00-3.317.583l1.8 1.8c.475-.191.983-.3 1.525-.3zM1.667 1.558l1.9 1.9.383.384A9.837 9.837 0 00.833 8c1.442 3.658 5 6.25 9.167 6.25 1.292 0 2.525-.25 3.65-.7l.35.35 2.442 2.433 1.058-1.058L2.725.5 1.667 1.558zm4.608 4.609l1.292 1.291A2.35 2.35 0 007.5 8c0 1.383 1.117 2.5 2.5 2.5.183 0 .367-.025.542-.067l1.291 1.292a4.13 4.13 0 01-1.833.442A4.168 4.168 0 015.833 8c0-.658.167-1.275.442-1.833zm3.592-.65l2.625 2.625.016-.134c0-1.383-1.116-2.5-2.5-2.5l-.141.009z"
        fill={color1}
      />
    </Svg>
  );
}

export default SvgComponent;
