import { StyleSheet, Text, TouchableHighlightBase, View } from "react-native";
import { useAuthentication } from "../../utils/hooks/useAuthentication";
import { Button } from "react-native-elements";
import { getAuth, signOut } from "firebase/auth";
import { useTranslation } from "react-i18next";
import { namespaces } from "../../i18n/i18n.constants";
import "../../i18n/i18n";


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
    <View style={styles.container}>
      <text>{t("welcome")}</text>
      <text>{t("radio")}</text>
      <text>{t("grants")}</text>
      <Button 
      title="English"
      {...t("buttons.ok", { ns: namespaces.common })}
      onPress={() => handleClick('en')}
      />
      <Button 
      title="Spanish"
      {...t("buttons.ok", { ns: namespaces.common })}
      onPress={() => handleClick('es')}
      />
      <Button 
      title="toggle"
      {...t("buttons.ok", { ns: namespaces.common })}
      onPress={() => handleClick(toggle(lang))}
      />
      <Button
        title="Back"
        style={styles.button}
        onPress={() => navigation.navigate("Home")}
      />
    </View>
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