import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View , TextInput, SafeAreaView} from "react-native";
import RectButton from "../../RectButton";
import { addGrant } from "../../../firebase/firestore/grants";
import styles from "./styles";


const AddGrantModal = (properties : any) => {
  const [dropdownData, setDropdownData] = useState([]);
  




  return (
    <View style={styles.centeredView}>
    </View>
  );
};

export default AddGrantModal;