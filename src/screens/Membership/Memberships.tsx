import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { memo, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@redux/store";
import AppContainer from "@components/Container/AppContainer";
import { useAppNavigation } from "@navigation/Navigation";
import BackButtonWithTitle from "@components/Header/BackButtonWithTitle";
import _ from "lodash";
import AppText from "@components/Text/AppText";
import FastImage from "react-native-fast-image";
import images from "@common/AllImages";
import svgs from "@common/AllSvgs";
import { VerticalSpacing } from "@components/Spacing/Spacing";
import moment from "moment";
import { Card } from "react-native-paper";
import { moderateScale } from "react-native-size-matters";

interface Court {
  minRate: number;
  maxRate: number;
  locationID: number;
  locationName: string;
  createdAt: string;
  updatedAt: string;
  locationAddress: string;
  lat: number;
  long: number;
  imagePath: string;
  locationDescription: string;
  area: number;
  courts: CourtDetail[];
}

interface CourtDetail {
  courtID: number;
  courtName: string;
  courtDescription: string;
  imagePath: string;
}

interface Membership {
  membershipID: number;
  createdAt: string;
  updatedAt: string;
  locationID: number;
  customerID: number;
  membershipType: string;
  filePath: string;
  expiryDate?: any;
  status: number;
  statusDescription: string;
}

interface MemberShipData {
  status: "Pending" | "Approved" | "Rejected" | "Expired" | string;
  data: { membership: Membership; loaction: Court }[];
}

interface MemberCardProps {
  imagePath: string;
  length: number;
  index: number;
  locationName: string;
  expiryDate: string;
  tag: string;
  type: "Pending" | "Approved" | "Rejected" | "Expired";
  OnPressEdit?: (data: any) => void;
}

const MemberCard = (props: MemberCardProps) => {
  const { theme } = useAppSelector(state => state.theme);
  const {
    imagePath,
    length,
    index,
    locationName,
    expiryDate,
    tag,
    type,
    OnPressEdit,
  } = props;

  return (
    <View
      style={{
        padding: moderateScale(10, 0.3),
        backgroundColor: theme.modalBackgroundColor,
        borderRadius: moderateScale(10, 0.3),
        borderBottomWidth: length - 1 > index ? 0.3 : 0,
        borderBlockColor: theme.gray,
        flexDirection: "row",
        width: "100%",
      }}>
      <FastImage
        style={{
          height: moderateScale(100, 0.3),
          width: moderateScale(110, 0.3),
          borderRadius: moderateScale(5, 0.3),
        }}
        source={{
          uri: `https://nodejsclusters-160185-0.cloudclusters.net/${imagePath}`,
          priority: FastImage.priority.high,
        }}
        resizeMode={FastImage.resizeMode.cover}
        defaultSource={images.Placeholder}
      />
      <View
        style={{
          marginLeft: moderateScale(10, 0.3),
          width: "100%",
          marginTop: moderateScale(5, 0.3),
        }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            padding: moderateScale(5, 0.3),
            paddingHorizontal: moderateScale(10, 0.3),
            borderRadius: moderateScale(100, 0.3),
            backgroundColor:
              type === "Approved"
                ? theme.secondaryLight
                : type === "Pending"
                  ? theme.ongoingLight
                  : theme.cancelLight,
            maxWidth: moderateScale(130, 0.3),
          }}>
          <svgs.MemberShipV2 />
          <AppText
            fontStyle="400.medium"
            style={{ marginLeft: moderateScale(2, 0.3) }}
            color={
              type === "Approved"
                ? theme.secondary
                : type === "Pending"
                  ? theme.ongoing
                  : theme.cancel
            }
            size={10}>
            {tag}
          </AppText>
        </View>
        <AppText
          fontStyle="500.semibold"
          numberOfLines={2}
          style={{
            marginVertical: moderateScale(10, 0.3),
            maxWidth: "68%",
            height: moderateScale(35, 0.3),
          }}>
          {locationName}
        </AppText>
        {type === "Approved" ? (
          <AppText numberOfLines={1} size={12}>
            Membership expiry date : {moment(expiryDate).format("DD MMM, YYYY")}
          </AppText>
        ) : type === "Pending" ? (
          <TouchableOpacity
            activeOpacity={0.8}
            hitSlop={{ bottom: 5, top: 5, left: 5, right: 5 }}
            onPress={data => OnPressEdit && OnPressEdit(data)}
            style={{ flexDirection: "row", alignItems: "center" }}>
            <AppText
              fontStyle="500.normal"
              style={{ alignItems: "center" }}
              color={theme.ongoing}
              numberOfLines={1}>
              Edit Membership{" "}
            </AppText>
            <svgs.Right height={18} width={18} color1={theme.ongoing} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            activeOpacity={0.8}
            hitSlop={{ bottom: 5, top: 5, left: 5, right: 5 }}
            onPress={data => OnPressEdit && OnPressEdit(data)}
            style={{ flexDirection: "row", alignItems: "center" }}>
            <AppText
              fontStyle="500.normal"
              style={{ alignItems: "center" }}
              color={theme.cancel}
              numberOfLines={1}>
              Verify Membership{" "}
            </AppText>
            <svgs.Right height={18} width={18} color1={theme.cancel} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

function Memberships() {
  const { theme } = useAppSelector(state => state.theme);
  const { user } = useAppSelector(state => state.user);
  const { locations } = useAppSelector(state => state.appData);
  const storeDispatch = useAppDispatch();
  const navigation = useAppNavigation();

  const OnPressEdit = (data: { membership: Membership; loaction: Court }) => {
    navigation.navigate("EditMemberShip", { data });
  };

  const [memberShipData, setMemberShipData] = useState<MemberShipData[] | null>(
    null,
  );

  const [approvedMemberShip, setApprovedMemberShip] =
    useState<MemberShipData | null>(null);
  const [rejectedMemberShip, setRejectedMemberShip] =
    useState<MemberShipData | null>(null);
  const [pendingMemberShip, setPendingMemberShip] =
    useState<MemberShipData | null>(null);
  const [expiredMemberShip, setExpiredMemberShip] =
    useState<MemberShipData | null>(null);

  useEffect(() => {
    if (locations) {
      const filteredMemberships: MemberShipData[] = [
        "Pending",
        "Approved",
        "Rejected",
        "Expired",
      ].map(status => {
        return {
          status: status,
          data: _.filter(user?.memberships, {
            statusDescription: status,
          }).map(memberShip => {
            return {
              membership: memberShip,
              loaction: _.filter(locations, {
                locationID: memberShip.locationID,
              })[0],
            };
          }),
        };
      });

      filteredMemberships
        ? setMemberShipData(filteredMemberships)
        : setMemberShipData(null);
    }
  }, [locations]);

  useEffect(() => {
    if (memberShipData) {
      const approvedMembership = _.filter(memberShipData, {
        status: "Approved",
      });
      const rejectedMembership = _.filter(memberShipData, {
        status: "Rejected",
      });
      const pendingMembership = _.filter(memberShipData, {
        status: "Pending",
      });
      const expiredMembership = _.filter(memberShipData, {
        status: "Expired",
      });
      setApprovedMemberShip(approvedMembership[0]);
      setRejectedMemberShip(rejectedMembership[0]);
      setPendingMemberShip(pendingMembership[0]);
      setExpiredMemberShip(expiredMembership[0]);
    }
  }, [memberShipData]);

  return (
    <AppContainer
      hideStatusbar={false}
      scrollable={false}
      backgroundColor={theme.appBackgroundColor}>
      <BackButtonWithTitle title="Memberships" />
      <ScrollView contentContainerStyle={{ padding: moderateScale(15, 0.3) }}>
        {approvedMemberShip && (
          <View>
            <AppText fontStyle="500.medium" size={16}>
              Verified Memberships
            </AppText>
            <VerticalSpacing />
            <Card
              style={{
                backgroundColor: theme.modalBackgroundColor,
                ...theme.light_shadow,
              }}>
              {_.map(approvedMemberShip.data, (item, index) => (
                <MemberCard
                  key={index}
                  index={index}
                  type="Approved"
                  tag="Membership Verified"
                  length={approvedMemberShip?.data?.length}
                  locationName={item?.loaction?.locationName}
                  imagePath={item?.loaction?.imagePath}
                  expiryDate={item?.membership?.expiryDate}
                />
              ))}
            </Card>
          </View>
        )}
        <VerticalSpacing size={20} />
        {pendingMemberShip && (
          <View>
            <AppText fontStyle="500.medium" size={16}>
              Under Verification
            </AppText>
            <VerticalSpacing />
            <Card
              style={{
                backgroundColor: theme.modalBackgroundColor,
                ...theme.light_shadow,
              }}>
              {_.map(pendingMemberShip.data, (item, index) => (
                <MemberCard
                  key={index}
                  index={index}
                  type="Pending"
                  tag="Under Verification"
                  length={pendingMemberShip?.data?.length}
                  locationName={item?.loaction?.locationName}
                  imagePath={item?.loaction?.imagePath}
                  expiryDate={item?.membership?.expiryDate}
                  OnPressEdit={() => OnPressEdit(item)}
                />
              ))}
            </Card>
          </View>
        )}
        <VerticalSpacing size={20} />
        {rejectedMemberShip && (
          <View>
            <AppText fontStyle="500.medium" size={16}>
              Not a Member
            </AppText>
            <VerticalSpacing />
            <Card
              style={{
                backgroundColor: theme.modalBackgroundColor,
                ...theme.light_shadow,
              }}>
              {_.map(rejectedMemberShip.data, (item, index) => (
                <MemberCard
                  key={index}
                  index={index}
                  type="Rejected"
                  tag="Not a Member"
                  length={rejectedMemberShip?.data?.length}
                  locationName={item?.loaction?.locationName}
                  imagePath={item?.loaction?.imagePath}
                  expiryDate={item?.membership?.expiryDate}
                  OnPressEdit={() => OnPressEdit(item)}
                />
              ))}
            </Card>
          </View>
        )}
        <VerticalSpacing size={20} />
        {expiredMemberShip && (
          <View>
            <AppText fontStyle="500.medium" size={16}>
              Expired Membership
            </AppText>
            <VerticalSpacing />
            <Card
              style={{
                backgroundColor: theme.modalBackgroundColor,
                ...theme.light_shadow,
              }}>
              {_.map(expiredMemberShip.data, (item, index) => (
                <MemberCard
                  key={index}
                  index={index}
                  type="Expired"
                  tag="Expired Membership"
                  length={expiredMemberShip?.data?.length}
                  locationName={item?.loaction?.locationName}
                  imagePath={item?.loaction?.imagePath}
                  expiryDate={item?.membership?.expiryDate}
                  OnPressEdit={() => OnPressEdit(item)}
                />
              ))}
            </Card>
          </View>
        )}
      </ScrollView>
    </AppContainer>
  );
}

export default memo(Memberships);

const styles = StyleSheet.create({});
