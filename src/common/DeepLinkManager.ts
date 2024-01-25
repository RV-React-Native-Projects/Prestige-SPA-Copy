import { Linking } from "react-native";
import _ from "lodash";
import Config from "react-native-config";

class DeepLinkManager {
  navigateTo = (targetUrl: string, id = null) => {
    const URL = targetUrl.trim();
    console.log("nav ===>", targetUrl);
    console.log("nav id ===>", id);

    if (URL === "app/profile") Linking.openURL(`${Config?.SCHEME}://${URL}`);
    else if (URL === "app/home") Linking.openURL(`${Config?.SCHEME}://${URL}`);
    else if (URL === "app/trip_details")
      Linking.openURL(`${Config?.SCHEME}://${URL}/${id}`);
    else if (URL === "app/vehicledocument")
      Linking.openURL(`${Config?.SCHEME}://${URL}/${id}`);
    else if (URL === "app/login") Linking.openURL(`${Config?.SCHEME}://${URL}`);
    else if (URL === "app/landing")
      Linking.openURL(`${Config?.SCHEME}://${URL}`);
    else if (URL === "app/notification")
      Linking.openURL(`${Config?.SCHEME}://${URL}`);
    else if (_.startsWith(URL, "http") || URL.indexOf("http") > -1)
      Linking.openURL(URL);
    else Linking.openURL(`${Config?.SCHEME}://app/home`);

    // else if (_.startsWith(targetUrl, "app/item")) {
    //   const itemId = _.split(targetUrl, "/")[2];
    //   NavigationManager.navigateTo("ITEM_DETAIL_SCREEN", {
    //     itemId: itemId || null,
    //   });
    // }
  };

  navigateToNotification = (originalNotification: any) => {
    console.log("Clicked notification = ");
    console.log(originalNotification);
    let notification = originalNotification.data;

    var link = "";
    if (notification && notification?.deepLink) {
      link = notification.deepLink;
      link = _.replace(link, '"', " ");
    } else if (notification && notification?.path) {
      link = notification?.path;
    }
    console.log("Deep link : ", link);
    this.navigateTo(link, notification?.id ?? null);
  };

  // navigateToDynamicLink = (link: string) => {
  //   console.log("Dynamic link : ", link);
  //   const url = new Url(link, Utils.queryStringParser);
  //   console.log(`navigateToDynamicLink url`, url);
  //   console.log("Dynamic link url : ", url.query);
  //   const path = url.query.path;
  //   if (path) {
  //     NavigationManager.navigateTo(path, url.query);
  //   }
  //   if (url.query.id) {
  //     NavigationManager.navigateTo("app/login", url.query.id);
  //   }
  // };
}

export default new DeepLinkManager();
