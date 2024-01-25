import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { SVGProps } from "@common/CommonTypes";

function SvgComponent(props: SVGProps) {
  const { width = 30, height = 30, color1 = "#1A295B", fill = "none" } = props;

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 28 28"
      fill={fill}
      {...props}>
      <Path
        d="M12.254 20.353c1.667 0 3.23-.498 4.53-1.35l4.594 4.56c.304.292.692.437 1.112.437.87 0 1.51-.675 1.51-1.527 0-.395-.136-.78-.43-1.07l-4.562-4.54a8.056 8.056 0 001.5-4.686c0-4.5-3.713-8.177-8.254-8.177C7.724 4 4 7.678 4 12.177c0 4.498 3.713 8.176 8.254 8.176zm0-2.182c-3.325 0-6.052-2.7-6.052-5.994 0-3.294 2.727-5.995 6.052-5.995 3.324 0 6.051 2.701 6.051 5.995 0 3.293-2.727 5.994-6.051 5.994z"
        fill={color1}
      />
    </Svg>
  );
}

export default SvgComponent;
