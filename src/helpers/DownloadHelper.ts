import Share from "react-native-share";
import RNFetchBlob from "rn-fetch-blob";
import { Platform } from "react-native";
import moment from "moment";
import Permissions from "@helpers/Permissions";
import RNFS from "react-native-fs";

const getFileExtention = (fileUrl: string) => {
  // To get the file extension
  return /[.]/.exec(fileUrl) ? /[^.]+$/.exec(fileUrl) : undefined;
};

const downloadUrl = async (url: string, filename = null) => {
  const lastIndex = url.lastIndexOf("/");
  const file_ext = url.substr(lastIndex);
  console.log("filename==>", filename);
  const file_path = filename ? moment() + filename : moment() + file_ext;
  console.log("file_path==>", file_path);
  var root_path =
    Platform.OS === "ios"
      ? RNFetchBlob.fs.dirs.DocumentDir
      : RNFetchBlob.fs.dirs.DCIMDir;
  console.log("root_path==>", root_path);
  let RootDir = root_path + "/Driver" + "/" + file_path;
  console.log("RootDir==>", RootDir);
  RNFetchBlob.config({
    fileCache: true,
    trusty: true,
    // credentials: true,
    addAndroidDownloads: {
      useDownloadManager: true,
      path: RootDir,
      notification: true,
      mime: "*/*",
      mediaScannable: true,
      title: file_path ?? "File",
      description: "TransportSimple-File",
    },
  })
    .fetch("GET", url, {})
    .then(res => {
      console.log("file saved to ==> ", res.path());
    })
    .catch(error => {
      // TODO (@Ranvijay): Throws an error, but works.
      throw error;
    });
};

export const shareInvoice = (url: string) => {
  //const url = "http://www.africau.edu/images/default/sample.pdf";
  fetch(url)
    .then(response => Promise.all([response.status, response.text()]))
    .then(([status, text]) => {
      console.log("Response from Url : ", text);
    });
  let filePath: any = null;
  const configOptions = { fileCache: true, trusty: true };
  RNFetchBlob.config(configOptions)
    .fetch("GET", url)
    .then(resp => {
      filePath = resp.path();
      return resp.readFile("base64");
    })
    .then(async base64Data => {
      base64Data = `data:application/pdf;base64,` + base64Data;
      // setLoading(false);
      await Share.open({ url: base64Data });

      await RNFS.unlink(filePath);
    });
};

// MANAGE_EXTERNAL_STORAGE

export const downloadFile = async (url: string, filename = null) => {
  var hasStoragePermission =
    await Permissions.requestWriteExternalStoragePermission();
  if (Platform.OS === "ios") downloadUrl(url, filename);
  else if (hasStoragePermission) downloadUrl(url, filename);
};
