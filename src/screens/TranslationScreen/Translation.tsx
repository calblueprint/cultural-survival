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



const auth = getAuth();


{
  "compilerOptions"; {
    "allowJs"; true
  }
}
var lang = 'es'

const TranslationScreen = ({ navigation }: any) => {
  const { user } = useAuthentication();
  const { i18n, t } = useTranslation(namespaces.pages.hello);
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