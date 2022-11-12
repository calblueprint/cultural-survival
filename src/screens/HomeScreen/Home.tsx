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

import React, { useState, useEffect } from "react";


import {
  CREDENTIALS
} from "@env";




const auth = getAuth();

const {Translate} = require('@google-cloud/translate').v2;
require('dotenv').config();

// Your credentials
//const CREDENTIALS = JSON.parse(TEST);
//const CREDENTIALS = process.env.CREDENTIALS;
const CRED = JSON.parse(CREDENTIALS);



// Configuration for the client
const translate = new Translate({
  credentials: CRED,
  projectId: CRED.project_id
});

{
  "compilerOptions"; {
    "allowJs"; true
  }
}
var lang = 'en'
//


const HomeScreen = ({ navigation }: any) => {
  const { user } = useAuthentication();
  const { i18n, t } = useTranslation(namespaces.pages.hello);
  const [text, setText] = useState("");

  useEffect(() => {
    //get all ur grants from mongodb

    // go through all your grants and translate all the text

    // put these in a state variable
    translateText("potato", "es").then((text) => {
      console.log(text);
    });
  }, [])

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
      <Text style={globalStyles.h2}>{t("welcome")}{user?.email}</Text>
      <Text style={globalStyles.body1}>{t("categories")}</Text>

      <RectButton 
      text="Toggle"
      {...t("buttons.ok", { ns: namespaces.common })}
      onPress={() => handleClick(toggle(lang))}
      />


      <RectButton
        text="Sign Out"
        buttonStyle={{ marginTop: "5%", backgroundColor: "#253C85" }}
        textStyle={{ color: "#FFF" }}
        onPress={() => signOut(auth)}
      />
      <RectButton
        text="Audio"
        buttonStyle={{ marginTop: "5%", backgroundColor: "#253C85" }}
        textStyle={{ color: "#FFF" }}
        onPress={() => navigation.navigate("Audio")}
      />
      <RectButton
        text="Grants"
        buttonStyle={{ marginTop: "5%", backgroundColor: "#253C85" }}
        textStyle={{ color: "#FFF" }}
        onPress={() => navigation.navigate("Grants")}
      />
      <RectButton
        text="Translation"
        buttonStyle={{ marginTop: "5%", backgroundColor: "#253C85" }}
        textStyle={{ color: "#FFF" }}
        onPress={() => navigation.navigate("Translation")}
      />
      <RectButton
        text="Sign In"
        buttonStyle={{ marginTop: "5%", backgroundColor: "#253C85" }}
        textStyle={{ color: "#FFF" }}
        onPress={() => navigation.navigate("Signin")}
      />
    </ViewContainer>
  );
};

export default HomeScreen;