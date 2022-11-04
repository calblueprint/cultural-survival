import { StyleSheet, Text, TouchableHighlightBase, View } from "react-native";
import { useAuthentication } from "../../utils/hooks/useAuthentication";
import { Button } from "react-native-elements";
import { getAuth, signOut } from "firebase/auth";
import { useTranslation } from "react-i18next";
import { namespaces } from "../../i18n/i18n.constants";
import "../../i18n/i18n";


import ViewContainer from "../../components/ViewContainer";
import RectButton from "../../components/RectButton";
import globalStyles from "../../globalStyles";
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
var lang = 'es'

const TranslationScreen = ({ navigation }: any) => {
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
      <Text style={globalStyles.h2}>{t("welcome")}</Text>
      <Text style={globalStyles.h2}>{t("radio")}</Text>
      <Text style={globalStyles.h2}>{t("grants")}</Text>
      <Text style={globalStyles.h4}>
        {/* {
        translateText("Please let this work", "es")
          .then((res) => {
            console.log(res);
          })
          .catch((err) =>{
            console.log(res);
            
          })
        }; */}
        </Text>
      
      

     
     


    
      <RectButton 
      text="English"
      {...t("buttons.ok", { ns: namespaces.common })}
      onPress={() => handleClick('en')}
      />
      <RectButton 
      text="Spanish"
      {...t("buttons.ok", { ns: namespaces.common })}
      onPress={() => handleClick('es')}
      />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    marginTop: 10,
  },
});

export default TranslationScreen;