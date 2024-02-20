import { SVGProps } from "@common/CommonTypes";
import * as React from "react";
import { moderateScale } from "react-native-size-matters";
import Svg, { Path } from "react-native-svg";

function SvgComponent(props: SVGProps) {
  const { width = 24, height = 24, fill = "none", color1 = "#4C9A2A" } = props;

  return (
    <Svg
      width={moderateScale(width, 0.3)}
      height={moderateScale(height, 0.3)}
      viewBox="0 0 20 20"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M12.5 18.96h-5c-4.525 0-6.458-1.934-6.458-6.459v-5c0-4.525 1.933-6.458 6.458-6.458h4.167a.63.63 0 01.625.625.63.63 0 01-.625.625H7.5c-3.842 0-5.208 1.367-5.208 5.208v5c0 3.842 1.366 5.209 5.208 5.209h5c3.842 0 5.208-1.367 5.208-5.209V8.335a.63.63 0 01.625-.625.63.63 0 01.625.625V12.5c0 4.525-1.933 6.459-6.458 6.459z"
        fill={color1}
      />
      <Path
        d="M18.333 8.96H15c-2.85 0-3.958-1.109-3.958-3.959V1.668c0-.25.15-.484.383-.575a.63.63 0 01.683.133l6.667 6.667a.628.628 0 01-.442 1.066zm-6.041-5.784v1.825c0 2.15.558 2.708 2.708 2.708h1.825l-4.533-4.533zM10.833 11.459h-5a.63.63 0 01-.625-.625.63.63 0 01.625-.625h5a.63.63 0 01.625.625.63.63 0 01-.625.625zM9.167 14.793H5.833a.63.63 0 01-.625-.625.63.63 0 01.625-.625h3.334a.63.63 0 01.625.625.63.63 0 01-.625.625z"
        fill={color1}
      />
    </Svg>
  );
}

export default SvgComponent;
