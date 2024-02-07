import React from "react";
import ContentLoader, { Rect } from "react-content-loader/native";
import { Dimensions } from "react-native";

var windowWidth = Dimensions.get("window").width;
var windowHeight = Dimensions.get("window").height;

export default function RectangleSK(props: any) {
  const { width = windowWidth / 4.7, height = 40 } = props;
  return (
    <ContentLoader
      speed={1.5}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      backgroundColor={"#cfe8f7"}
      foregroundColor={"#ededed"}
      {...props}>
      <Rect x="0" y="0" rx="4" ry="4" width={width} height={height} />
    </ContentLoader>
  );
}
