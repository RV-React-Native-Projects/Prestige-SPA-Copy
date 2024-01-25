import React, { useEffect, useLayoutEffect, useState, memo } from "react";
import { StyleSheet, View } from "react-native";
import CountryPicker, { DARK_THEME } from "react-native-country-picker-modal";
import { moderateScale } from "react-native-size-matters";
import * as RNLocalize from "react-native-localize";
import { Country } from "@constants/Country";
import _ from "lodash";
import DeviceCountry from "react-native-device-country";
import { useAppSelector } from "@redux/store";
import AppText from "../Text/AppText";
import svgs from "@common/AllSvgs";

interface CountryCodePickerProps {
  getCountryName?: (callingCode: string) => void;
  containerButtonStyle?: any; // Adjust the type based on your actual style object
  label?: string;
  labelSize?: number;
  required?: boolean;
}

function CountryNamePicker(props: CountryCodePickerProps) {
  const { theme, isDarkMode } = useAppSelector(state => state.theme);
  const {
    getCountryName,
    label,
    labelSize = 14,
    required = false,
    containerButtonStyle,
  } = props || {};
  const [visable, setVisable] = useState(false);
  const [selected, setSelected] = useState<string | undefined | any>();
  const [callingCode, setCallingCode] = useState<any>(null);
  const [contryName, setContryName] = useState<string>("");

  const findCountryCode = () => {
    DeviceCountry.getCountryCode()
      .then(async result => {
        console.log("getCountryName==>", result);
        setSelected(result?.code?.toUpperCase());
      })
      .catch(e => {
        console.log(e);
        setSelected(RNLocalize.getCurrencies()[0]);
      });
  };

  useLayoutEffect(() => {
    if (!selected) findCountryCode();
  }, []);

  const toggleVisible = () => {
    setVisable(!visable);
  };

  useEffect(() => {
    if (getCountryName) getCountryName(contryName);
  }, [selected, contryName, callingCode]);

  const onSelect = (country: any) => {
    setContryName(country?.name);
    setSelected(country?.cca2);
    getCountryName && getCountryName(country?.name);
  };

  useEffect(() => {
    if (selected) {
      var country_code = _.find(
        Country?.data,
        info => info.alpha2Code === selected,
      );
      country_code && setContryName(country_code?.name);
      setCallingCode(country_code?.callingCodes[0]);
    }
  }, [selected]);

  return (
    <>
      {label ? (
        <AppText
          size={labelSize}
          fontStyle="600.semibold"
          color={theme.subHeader}
          style={{ marginVertical: 5 }}>
          {label} {required && <AppText color={theme.error}> *</AppText>}
        </AppText>
      ) : null}
      <View
        style={{
          height: moderateScale(50, 0.3),
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: theme.white,
          paddingHorizontal: 15,
          borderWidth: 1,
          borderColor: theme.gray,
          borderRadius: 5,
        }}>
        <CountryPicker
          // theme={isDarkMode ? DARK_THEME : LIGHT_THEME}
          countryCode={selected}
          withFilter={true}
          withFlag={true}
          withCurrencyButton={false}
          withAlphaFilter={true}
          withCallingCodeButton={false}
          withCountryNameButton={true}
          withFlagButton={true}
          withCallingCode={true}
          withEmoji={true}
          withModal={true}
          onSelect={country => onSelect(country)}
          visible={visable}
          containerButtonStyle={{
            flex: 1,
            height: moderateScale(50, 0.3),
            width: "100%",
            minWidth: "100%",
            maxWidth: "95%",
            alignItems: "flex-start",
            justifyContent: "center",
            color: theme.title,
            ...containerButtonStyle,
          }}
        />
        <svgs.Down height={10} width={15} />
      </View>
    </>
  );
}

export default memo(CountryNamePicker);

const styles = StyleSheet.create({});
