import EncryptedStorage from "react-native-encrypted-storage";

export const useEncryptedStorage = () => {
  const setStorage = async (key: string, value: any) => {
    try {
      await EncryptedStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log("Error at Storing", error);
    }
  };

  const getStorage = async (key: string) => {
    try {
      const value: any = await EncryptedStorage.getItem(key);
      return JSON.parse(value);
    } catch (error) {
      console.log("Error at Getting", error);
    }
  };

  const removeStorage = async (key: string) => {
    try {
      await EncryptedStorage.removeItem(key);
    } catch (error) {
      console.log("Error at Removing", error);
    }
  };

  return { setStorage, getStorage, removeStorage };
};
