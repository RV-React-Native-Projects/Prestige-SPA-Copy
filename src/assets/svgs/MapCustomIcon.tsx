import * as React from "react";
import Svg, {
  Ellipse,
  Path,
  Circle,
  G,
  Defs,
  ClipPath,
} from "react-native-svg";
import { SVGProps } from "@common/CommonTypes";
import { moderateScale } from "react-native-size-matters";

function SvgComponent(props: SVGProps) {
  const {
    width = 30,
    height = 30,
    color1 = "#266EFF",
    color2 = "#252B5C",
    color = "#FFF",
    fill = "none",
    strokeWidth = 1.5,
  } = props;

  return (
    <Svg
      width={moderateScale(width, 0.3)}
      height={moderateScale(height, 0.3)}
      viewBox="0 0 39 57"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Ellipse
        opacity={0.15}
        cx={17.443}
        cy={10.1845}
        rx={17.443}
        ry={10.1845}
        transform="scale(-1 1) rotate(-.927 2241.893 2268.677)"
        fill={color2}
      />
      <Ellipse
        opacity={0.5}
        cx={8.05063}
        cy={4.75278}
        rx={8.05063}
        ry={4.75278}
        transform="scale(-1 1) rotate(-.927 2572.926 1685.443)"
        fill={color1}
      />
      <Path
        d="M.461 19.009c-.113 7.014 8.105 17.52 13.571 23.72 2.578 2.925 6.991 2.996 9.663.157 5.664-6.02 14.217-16.255 14.33-23.27a19.128 19.128 0 00-5.283-13.53A18.672 18.672 0 0019.552.304 18.672 18.672 0 006.18 5.657 19.128 19.128 0 00.461 19.009z"
        fill={color1}
      />
      <Path
        opacity={0.25}
        d="M18.997 34.554a15.47 15.47 0 11.5-30.934 15.47 15.47 0 01-.5 30.934z"
        fill={color}
      />
      <Circle cx={19} cy={19} r={16} fill={color1} />
      <G
        clipPath="url(#clip0_1700_43272)"
        stroke={color}
        strokeWidth={moderateScale(strokeWidth, 0.3)}>
        <Path d="M19 29c5.523 0 10-4.477 10-10S24.523 9 19 9 9 13.477 9 19s4.477 10 10 10z" />
        <Path
          d="M19 9c-.05 3.334-.87 5.835-2.456 7.502-1.587 1.668-4.101 2.502-7.544 2.502"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M28.984 19.503c-3.256-.224-5.744.472-7.464 2.088C19.8 23.206 18.96 25.676 19 29"
          strokeLinecap="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_1700_43272">
          <Path fill={color} transform="translate(7 7)" d="M0 0H24V24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default SvgComponent;
