import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, TextInput, SafeAreaView} from "react-native";
import RectButton from "../../RectButton";
import { editGrant } from "../../../firebase/firestore/grants";
import styles from "./styles";


const EditGrantModal = (properties : any) => {
  const[modalVisible, setModalVisible] = useState(false);
  const[amountField, setAmountField] = useState(properties.grant.amount);
  const[categoryField, setCategoryField] = useState(properties.grant.category);
  const[countriesField, setCountriesField] = useState("countries"); // set as string temporarily 
  const[deadlineField, setDeadlineField] = useState("date"); // set as string temporarily 
  const[descriptionField, setDescriptionField] = useState(properties.grant.description);
  const[subjectField, setSubjectField] = useState(properties.grant.subject);
  const[titleField, setTitleField] = useState(properties.grant.title);
  const[durationField, setDurationField] = useState(properties.grant.duration);

  const clearFields = () => {
    setAmountField(0);
    setCategoryField("");
    setCountriesField("");
    setDeadlineField("");
    setDescriptionField("");
    setDurationField("");
    setSubjectField("");
    setTitleField("");
  }

  const handleEdit = async () => {
    if (categoryField != "" && amountField != "" && descriptionField != "" &&
          durationField != "" && subjectField != "" && titleField != "" && properties.grantID != "pz6WEgDiZbOW6tlYS9Am") { 

      console.log("grantToBeEdited")
      console.log(properties.grantID)
      console.log(properties.grant.title)
      await editGrant(
        properties.grantID, 
        amountField, 
        categoryField, 
        ["countriesField", "Yup"], 
        descriptionField, 
        durationField, 
        subjectField, 
        titleField
      );
      console.log("grantEdited!")
      

      //clearFields();
      properties.onEdit(properties.grant.grant_id)
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
            <Text style={styles.modalText}>Edit a grant</Text>

            <SafeAreaView>
              <TextInput
                style={styles.input}
                onChangeText={setAmountField}
                value={amountField}
                keyboardType="numeric"
              />

              <TextInput
                style={styles.input}
                onChangeText={setCategoryField}
                value={categoryField}
              />
              <TextInput
                style={styles.input}
                onChangeText={setCountriesField}
                value={"countries"}
              />
              <TextInput
                style={styles.input}
                onChangeText={setDescriptionField}
                value={descriptionField}
              />
              <TextInput
                style={styles.input}
                onChangeText={setDurationField}
                value={durationField}
              />
              <TextInput
                style={styles.input}
                onChangeText={setSubjectField}
                value={subjectField}
              />
              <TextInput
                style={styles.input}
                onChangeText={setTitleField}
                value={titleField}
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
              onPress={() => handleEdit()}
            >
              <Text style={styles.textStyle}>Submit Edit</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>Edit Grant</Text>
      </Pressable>
    </View>
  );
};

export default EditGrantModal;