import React from "react";
import ContentLoader, { Rect } from "react-content-loader/native";
import { Dimensions } from "react-native";

var windowWidth = Dimensions.get("window").width;

export default function HomeDateSK(props: any) {
  const { width = windowWidth, height = 380 } = props;
  return (
    <ContentLoader
      speed={2}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      backgroundColor="#e3e3e3"
      foregroundColor="#A7A8AE"
      {...props}>
      <Rect x="15" y="15" rx="4" ry="4" width={width - 30} height="30" />
      <Rect x="15" y="60" rx="5" ry="5" width="42%" height={height - 100} />
      <Rect x="48%" y="60" rx="5" ry="5" width="42%" height={height - 100} />
      <Rect x="92%" y="60" rx="5" ry="5" width="42%" height={height - 100} />
      <Rect x="128%" y="60" rx="5" ry="5" width="42%" height={height - 100} />
    </ContentLoader>
  );
}
