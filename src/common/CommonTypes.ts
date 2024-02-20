import React from "react";
import { SvgProps } from "react-native-svg";

export interface SVGProps extends SvgProps {
  // Basic SVG Attributes
  xmlns?: string;
  xmlnsXlink?: string;
  xmlSpace?: string;

  // SVG Size and Dimensions
  width?: number;
  height?: number;

  // Styling
  fill?: string;
  stroke?: string;
  strokeWidth?: number;

  // Custom Colors
  color1?: string;
  color2?: string;
  color3?: string;

  // Clipping and Masking
  clipPath?: string;
  mask?: string;

  // Transformations
  transform?: string;

  // Event Handlers
  onClick?: () => void;
  onMouseDown?: () => void;
  onMouseUp?: () => void;

  // Accessibility
  ariaLabel?: string;
  ariaLabelledBy?: string;

  // Custom Styles
  style?: any; // or use specific CSS properties as per your requirement

  children?: React.ReactNode;
}
