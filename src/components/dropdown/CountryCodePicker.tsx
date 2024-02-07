import React, { useEffect, useLayoutEffect, useState, memo } from "react";
import { StyleSheet, View } from "react-native";
import CountryPicker, { DARK_THEME } from "react-native-country-picker-modal";
import svgs from "@common/AllSvgs";
import { moderateScale } from "react-native-size-matters";
import * as RNLocalize from "react-native-localize";
import { Country } from "@constants/Country";
import _ from "lodash";
import DeviceCountry from "react-native-device-country";
import { useAppSelector } from "@redux/store";

interface CountryCodePickerProps {
  getCountryCode?: (callingCode: string) => void;
  containerButtonStyle?: any; // Adjust the type based on your actual style object
}

export default function CountryCodePicker(props: CountryCodePickerProps) {
  const { theme, isDarkMode } = useAppSelector(state => state.theme);
  const { getCountryCode } = props || {};
  const [visable, setVisable] = useState(false);
  const [selected, setSelected] = useState<string | undefined | any>();
  const [callingCode, setCallingCode] = useState<any>(null);

  const findCountryCode = () => {
    DeviceCountry.getCountryCode()
      .then(async result => {
        console.log("getCountryCode==>", result);
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
    if (getCountryCode) getCountryCode(callingCode || "");
  }, [selected, callingCode]);

  const onSelect = (country: any) => {
    setSelected(country?.cca2);
    setCallingCode(country?.callingCode[0]);
    getCountryCode && getCountryCode(country?.callingCode[0]);
  };

  useEffect(() => {
    if (selected) {
      var country_code = _.find(
        Country?.data,
        info => info.alpha2Code === selected,
      );
      setCallingCode(country_code?.callingCodes[0]);
    }
  }, [selected]);

  return (
    <View
      style={{
        height: moderateScale(50, 0.3),
        width: "28%",
        flexDirection: "row",
        borderWidth: 1,
        borderColor: theme.gray,
        borderRadius: 5,
        backgroundColor: theme.modalBackgroundColor,
        paddingHorizontal: 5,
        marginRight: 5,
        alignItems: "center",
        justifyContent: "space-between",
      }}>
      <CountryPicker
        // theme={isDarkMode ? DARK_THEME : LIGHT_THEME}
        countryCode={selected}
        withFilter={true}
        withFlag={true}
        withCurrencyButton={false}
        withAlphaFilter={true}
        withCallingCodeButton={true}
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
          ...props.containerButtonStyle,
        }}
      />
      {/* <svgs.Down height={10} width={15} /> */}
    </View>
  );
}

const styles = StyleSheet.create({});
