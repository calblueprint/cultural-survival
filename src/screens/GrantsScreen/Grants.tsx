import { StyleSheet, Text, View } from "react-native";
import { useAuthentication } from "../../utils/hooks/useAuthentication";
import { Button } from "react-native-elements";
import { getAuth, signOut } from "firebase/auth";
import ViewContainer from "../../components/ViewContainer";
import RectButton from "../../components/RectButton";
import globalStyles from "../../globalStyles";
import styles from "./styles";


import { useTranslation } from "react-i18next";
import { namespaces } from "../../i18n/i18n.constants";
import "../../i18n/i18n";
import React, {useState, useEffect} from "react";


const auth = getAuth();

import {
  CREDENTIALS
} from "@env";

const {Translate} = require('@google-cloud/translate').v2;
require('dotenv').config();

// Your credentials
//const CREDENTIALS = JSON.parse(TEST);
//const CREDENTIALS = process.env.CREDENTIALS;
const CRED = JSON.parse(CREDENTIALS);
var lang = 'es'



// Configuration for the client
const translate = new Translate({
  credentials: CRED,
  projectId: CRED.project_id
});

const GrantsScreen = ({ navigation }: any) => {
  const { i18n, t } = useTranslation(namespaces.pages.grants);
  const [text, setText] = useState("");
  const { user } = useAuthentication();

  const translateText = async (text, targetLanguage) => {
    try {
        let [response] = await translate.translate(text, targetLanguage);
        return response;
    } catch (error) {
        console.log(`Error at translateText --> ${error}`);
        return 0;
    }
  };

  function handleClick(lang: string) {
    i18n.changeLanguage(lang);

  }
  
  function toggle(lg: string) {
    console.log(lang)
    lang = (lg == 'en' ? 'es' : 'en')
    console.log(lang)
    return lang

  }

  return (
    <ViewContainer>
      <Text style={globalStyles.h2}>{t("grants_feed")}</Text>
  

      
      <RectButton 
      text="toggle"
      {...t("buttons.ok", { ns: namespaces.common })}
      onPress={() => handleClick(toggle(lang))}
      />
      <RectButton
        text="Back"
        buttonStyle={{ marginTop: "5%", backgroundColor: "#253C85" }}
        textStyle={{ color: "#FFF" }}
        onPress={() => navigation.navigate("Home")}
        
      /> 
    </ViewContainer>
  );
};

export default GrantsScreen;