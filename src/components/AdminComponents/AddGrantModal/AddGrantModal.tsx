import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View , TextInput, SafeAreaView} from "react-native";
import RectButton from "../../RectButton";
import { addGrant } from "../../../firebase/firestore/grants";
import styles from "./styles";


const AddGrantModal = (properties : any) => {
  const[modalVisible, setModalVisible] = useState(false);
  const[categoryField, setCategoryField] = useState("");
  const[countriesField, setCountriesField] = useState(""); // set as string temporarily 
  const[deadlineField, setDeadlineField] = useState(""); // set as string temporarily 
  const[descriptionField, setDescriptionField] = useState("");
  const[subjectField, setSubjectField] = useState("");
  const[titleField, setTitleField] = useState("");
  const[durationField, setDurationField] = useState("");
  const[amountField, setAmountField] = useState("");

  const clearFields = () => {
    setAmountField("");
    setCategoryField("");
    setCountriesField("");
    setDeadlineField("");
    setDescriptionField("");
    setDurationField("");
    setSubjectField("");
    setTitleField("");
  }

  const handleUpload = async () => {
    
    if (categoryField != "" && amountField != "" && descriptionField != "" &&
          durationField != "" && subjectField != "" && titleField != "") { 

      const grant: any = {
        amount: amountField,
        category: categoryField,
        countries: ["Country1", "Country2"], // update later once multiling support w inputs is researched
        deadline: new Date(), // update later once multiling support w inputs is researched
        description: descriptionField,
        duration: durationField,
        subject: subjectField,
        title: titleField,
      }

      await addGrant(grant);
      clearFields();
      properties.onNewGrant(grant);
      setModalVisible(!modalVisible);

    }

  }

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Upload a grant</Text>
            <SafeAreaView>
              <TextInput
                style={styles.input}
                onChangeText={setAmountField}
                value={amountField}
                keyboardType="numeric"
                placeholder="amount"
              />
              <TextInput
                style={styles.input}
                onChangeText={setCategoryField}
                value={categoryField}
                placeholder="category"
              />
              <TextInput
                style={styles.input}
                onChangeText={setCountriesField}
                value={""}
                placeholder="countries"
              />
              <TextInput
                style={styles.input}
                onChangeText={setDescriptionField}
                value={descriptionField}
                placeholder="description"
              />
              <TextInput
                style={styles.input}
                onChangeText={setDurationField}
                value={durationField}
                placeholder="duration"
              />
              <TextInput
                style={styles.input}
                onChangeText={setSubjectField}
                value={subjectField}
                placeholder="subject"
              />
              <TextInput
                style={styles.input}
                onChangeText={setTitleField}
                value={titleField}
                placeholder="title"
              /> 

            </SafeAreaView>

            <input type="datetime-local"/>
            <input placeholder="Countries"/>

    
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Cancel</Text>
            </Pressable>

            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => handleUpload()}
            >
              <Text style={styles.textStyle}>Upload</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>Upload Grant</Text>
      </Pressable>
    </View>
  );
};

export default AddGrantModal;