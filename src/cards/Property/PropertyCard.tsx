import AppText from "@src/components/Text/AppText";
import { useAppSelector } from "@src/redux/store";
import _ from "lodash";
import React from "react";
import svgs from "@common/AllSvgs";
import {
  Image,
  Pressable,
  Share,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { moderateScale } from "react-native-size-matters";
import { Card } from "react-native-paper";

interface PropertyCardPorps {
  item?: any;
  onPressCard?: () => void;
}

export default function PropertyCard(props: PropertyCardPorps) {
  const { theme } = useAppSelector(state => state.theme);
  const { item, onPressCard } = props;
  const primaryImage = _.filter(item?.images, img => img?.isPrimary);

  const getPropertyStatusColor = (type: string) => {
    const colorMap: Record<string, string> = {
      "Active Tenancy": "#407E47",
      "In Tenancy": "#407E47",
      "To Let- Available": "#EF3F49",
      "Pre appraisal": "#848484",
      "Market Appraisal": "#2094E9",
    };

    return colorMap[type] || "#EB8600";
  };

  const getPropertyTypeColor = (type: string) => {
    const colorMap: Record<string, string> = {
      Apartment: "#EF3F49",
      Flat: "#EB8600",
      Villa: "#2094E9",
    };

    return colorMap[type] || "#EB8600";
  };

  const onPressShare = () => {
    try {
      Share.share({
        message: `Checkout the Property , URL: ${item?.websiteURL}`,
        url: item?.websiteURL,
        title: "Checkout the Property",
      });
    } catch (error) {
      console.log("Error at Sharing", error);
    }
  };

  return (
    <Card
      style={{
        marginBottom: moderateScale(15, 0.3),
        borderRadius: moderateScale(10, 0.3),
        backgroundColor: theme.modalBackgroundColor,
        position: "relative",
        ...theme.mid_shadow,
      }}>
      <Pressable
        style={{
          height: 40,
          width: 40,
          zIndex: 10,
          position: "absolute",
          top: 10,
          right: 10,
          backgroundColor: "#FFFFFF90",
          borderRadius: 100,
          alignItems: "center",
          justifyContent: "center",
        }}
        hitSlop={{ top: 15, bottom: 25, left: 25, right: 15 }}
        onPress={onPressShare}>
        <svgs.Share />
      </Pressable>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={onPressCard && onPressCard}>
        <View style={{ height: 220 }}>
          <Image
            source={{ uri: primaryImage[0]?.url }}
            style={{
              height: "100%",
              width: "100%",
              borderTopLeftRadius: moderateScale(10, 0.3),
              borderTopRightRadius: moderateScale(10, 0.3),
              resizeMode: "cover",
            }}
          />
        </View>
        <View style={{ padding: 20 }}>
          <View
            style={{
              backgroundColor: theme.modalBackgroundColor,
              maxWidth: "30%",
              borderRadius: 5,
              alignItems: "center",
              justifyContent: "center",
              height: 40,
              top: -35,
            }}>
            <AppText
              fontStyle="400.normal"
              color={getPropertyTypeColor(item?.propertyType)}>
              {item?.propertyType}
            </AppText>
          </View>

          <View
            style={{
              backgroundColor: getPropertyStatusColor(
                item?.propertyFeatures?.propertyStatus,
              ),
              flexDirection: "column",
              maxWidth: "40%",
              padding: 10,
              borderRadius: 50,
              alignItems: "center",
              top: -15,
            }}>
            <AppText
              color={theme.modalBackgroundColor}
              fontStyle="400.normal"
              numberOfLines={1}>
              {item?.propertyFeatures?.propertyStatus}
            </AppText>
          </View>
          <AppText fontStyle="500.semibold" size={16} numberOfLines={2}>
            {item?.title}
          </AppText>
          <View
            style={{
              paddingVertical: 10,
              flexDirection: "row",
              alignItems: "center",
              maxWidth: "95%",
            }}>
            <svgs.LocationV2 height={20} />
            <AppText fontStyle="400.normal" numberOfLines={2}>
              {item?.address?.line1} {item?.address?.line2}{" "}
              {item?.address?.line3} {item?.address?.line4}{" "}
              {item?.address?.localTimeZone}
            </AppText>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {item?.propertyFeatures?.bedrooms && (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginRight: 20,
                }}>
                <View
                  style={{
                    height: 30,
                    width: 30,
                    borderRadius: 100,
                    backgroundColor: "#F7F9FE",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: 5,
                  }}>
                  <svgs.Beds height={20} />
                </View>
                <AppText fontStyle="400.normal">
                  {item?.propertyFeatures?.bedrooms}
                </AppText>
              </View>
            )}
            {item?.propertyFeatures?.bathrooms && (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginRight: 20,
                }}>
                <View
                  style={{
                    height: 30,
                    width: 30,
                    borderRadius: 100,
                    backgroundColor: "#F7F9FE",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: 5,
                  }}>
                  <svgs.Bath height={20} />
                </View>
                <AppText fontStyle="400.normal">
                  {item?.propertyFeatures?.bathrooms}
                </AppText>
              </View>
            )}
            {item?.propertyFeatures?.area && (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginRight: 20,
                }}>
                <View
                  style={{
                    height: 30,
                    width: 30,
                    borderRadius: 100,
                    backgroundColor: "#F7F9FE",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: 5,
                  }}>
                  <svgs.Size height={20} />
                </View>
                <AppText fontStyle="400.normal">
                  {item?.propertyFeatures?.area}
                </AppText>
              </View>
            )}
          </View>
          {item?.propertyFeatures?.rent && (
            <View style={{ paddingTop: 10 }}>
              <AppText fontStyle="600.bold" color={theme.primary} size={16}>
                {item?.propertyFeatures?.rent}
              </AppText>
            </View>
          )}
        </View>
      </TouchableOpacity>
    </Card>
  );
}

const styles = StyleSheet.create({});
