import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { SVGProps } from "@common/CommonTypes";
import { moderateScale } from "react-native-size-matters";

function SvgComponent(props: SVGProps) {
  const { width = 28, height = 28, color1 = "#fcdb33", fill = "none" } = props;

  return (
    <Svg
      id="Layer_1"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      width={moderateScale(width, 0.3)}
      height={moderateScale(height, 0.3)}
      viewBox="0 0 122.88 122.88"
      {...props}>
      <Path
        d="M30 13.21a3.93 3.93 0 116.8-3.94L41.86 18a3.94 3.94 0 11-6.81 4L30 13.21zm31.45 13a35.23 35.23 0 11-24.93 10.31A35.13 35.13 0 0161.44 26.2zM58.31 4a3.95 3.95 0 117.89 0v10.06a3.95 3.95 0 11-7.89 0V4zm29.18 6.1A3.93 3.93 0 1194.3 14l-5.06 8.76a3.93 3.93 0 11-6.81-3.92l5.06-8.75zM109.67 30a3.93 3.93 0 113.94 6.81l-8.75 5.06a3.94 3.94 0 11-4-6.81l8.81-5.06zm9.26 28.32a3.95 3.95 0 110 7.89h-10.11a3.95 3.95 0 110-7.89zm-6.15 29.18a3.93 3.93 0 11-3.91 6.81l-8.76-5.06a3.93 3.93 0 113.89-6.82l8.75 5.06zm-19.89 22.17a3.93 3.93 0 11-6.81 3.94L81 104.86a3.94 3.94 0 016.81-4l5.06 8.76zm-28.32 9.26a3.95 3.95 0 11-7.89 0v-10.11a3.95 3.95 0 117.89 0v10.11zm-29.18-6.15a3.93 3.93 0 01-6.81-3.91l5.06-8.76a3.93 3.93 0 116.81 3.89l-5.06 8.75zM13.21 92.89a3.93 3.93 0 11-3.94-6.81L18 81a3.94 3.94 0 114 6.83l-8.76 5.06zM4 64.57a3.95 3.95 0 110-7.89h10.06a3.95 3.95 0 110 7.89zm6.1-29.18a3.93 3.93 0 113.9-6.81l8.76 5.06a3.93 3.93 0 11-3.92 6.81l-8.74-5.06z"
        fill={color1}
      />
    </Svg>
  );
}

export default SvgComponent;
