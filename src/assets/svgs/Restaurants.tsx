import { SVGProps } from "@src/common/CommonTypes";
import * as React from "react";
import Svg, { Path } from "react-native-svg";

function SvgComponent(props: SVGProps) {
  const { width = 30, height = 30, color1 = "#1A295B", fill = "none" } = props;

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 14 15"
      fill={fill}
      {...props}>
      <Path
        d="M4.725 8.28l1.651-1.65-3.611-3.605a.586.586 0 00-.94.156 2.343 2.343 0 00.455 2.66l2.445 2.44zM8.68 7.226a2.837 2.837 0 003.076-.801c1.115-1.114 1.33-2.713.473-3.57-.857-.858-2.45-.642-3.57.472a2.836 2.836 0 00-.807 3.071l-5.285 5.289a.582.582 0 00.823.822L7 8.91l3.606 3.605a.581.581 0 10.822-.823L7.823 8.086l.855-.855.002-.006z"
        fill={color1}
      />
    </Svg>
  );
}

export default SvgComponent;
