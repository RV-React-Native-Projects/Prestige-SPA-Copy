import React, { createContext, useEffect, useState, ReactNode } from "react";
import Message from "@common/Message.json";
import I18n from "i18n-js";

// const i18n = new I18n(Message);

I18n.translations = Message;
I18n.defaultLocale = "en-US";
I18n.fallbacks = true;
// I18n.locales = { languageTag: "en-US" };

const MessagesContext = createContext<MessagesContextType | undefined>(
  undefined
);

interface MessagesContextType {
  locale?: string;
  setLanguage?: (lang: string) => void;
}

interface MessagesContextProviderProps {
  children: ReactNode;
}

export function MessagesContextProvider(props: MessagesContextProviderProps) {
  const defaultLanguage = "en-US";
  const [locale, setLocale] = useState<string>(defaultLanguage);

  const setLanguage = (lang: string) => {
    setLocale(lang);
    // You can add AsyncStorage logic here
  };

  useEffect(() => {
    I18n.locale = locale;
  }, [locale]);

  useEffect(() => {
    async function languageFetch() {
      // You can add AsyncStorage logic here to get the selected language
      setLocale(defaultLanguage);
    }
    languageFetch();
  }, []);

  return (
    <MessagesContext.Provider value={{ locale, setLanguage }}>
      {props.children}
    </MessagesContext.Provider>
  );
}

export default MessagesContext;
