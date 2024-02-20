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
        d="M2.917 8.185v1.64a1.173 1.173 0 00.606 1.026l2.915 1.596a1.158 1.158 0 001.12 0l2.917-1.592a1.173 1.173 0 00.606-1.027V8.185L7.558 10.11a1.158 1.158 0 01-1.12 0L2.917 8.185zm3.52-5.63L1.524 5.236a.587.587 0 000 1.027l4.915 2.683a1.158 1.158 0 001.12 0l4.69-2.56v3.447a.583.583 0 101.167 0v-3.74a.588.588 0 00-.304-.513l-5.55-3.027a1.19 1.19 0 00-1.12 0h-.003z"
        fill={color1}
      />
    </Svg>
  );
}

export default SvgComponent;
