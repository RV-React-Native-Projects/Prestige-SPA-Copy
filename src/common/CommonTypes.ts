import { SvgProps } from "react-native-svg";

export interface SVGProps extends SvgProps {
  xmlns?: string;
  xmlnsXlink?: string;
  xmlSpace?: string;
  width?: number;
  height?: number;
  fill?: string;
  color1?: string;
  color2?: string;
  strokeWidth: number;
  style: any;
}
