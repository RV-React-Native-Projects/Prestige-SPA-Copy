import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { SVGProps } from "@common/CommonTypes";

function SvgComponent(props: SVGProps) {
  const { width = 24, height = 24, fill = "none", color1 = "#4C9A2A" } = props;

  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M9 17.752c-.41 0-.75-.34-.75-.75v-4.19l-.72.72c-.29.29-.77.29-1.06 0a.754.754 0 010-1.06l2-2c.21-.21.54-.28.82-.16.28.11.46.39.46.69v6c0 .41-.34.75-.75.75z"
        fill={color1}
      />
      <Path
        d="M11 13.751c-.19 0-.38-.07-.53-.22l-2-2a.754.754 0 010-1.06c.29-.29.77-.29 1.06 0l2 2c.29.29.29.77 0 1.06-.15.15-.34.22-.53.22z"
        fill={color1}
      />
      <Path
        d="M15 22.751H9c-5.43 0-7.75-2.32-7.75-7.75v-6c0-5.43 2.32-7.75 7.75-7.75h5c.41 0 .75.34.75.75s-.34.75-.75.75H9c-4.61 0-6.25 1.64-6.25 6.25v6c0 4.61 1.64 6.25 6.25 6.25h6c4.61 0 6.25-1.64 6.25-6.25v-5c0-.41.34-.75.75-.75s.75.34.75.75v5c0 5.43-2.32 7.75-7.75 7.75z"
        fill={color1}
      />
      <Path
        d="M22 10.752h-4c-3.42 0-4.75-1.33-4.75-4.75v-4c0-.3.18-.58.46-.69.28-.12.6-.05.82.16l8 8a.751.751 0 01-.53 1.28zm-7.25-6.94v2.19c0 2.58.67 3.25 3.25 3.25h2.19l-5.44-5.44z"
        fill={color1}
      />
    </Svg>
  );
}

export default SvgComponent;
