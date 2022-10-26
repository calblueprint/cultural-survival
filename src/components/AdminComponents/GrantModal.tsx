import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import RectButton from "../RectButton";
import { addGrant } from "../../firebase/firestore/grants";
import styles from "./GrantModalStyles";


const GrantModal = (properties : any) => {
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
        animationType="slide"
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
            
            <input placeholder="Title" value={titleField} 
              onChange={(event) => setTitleField(event.target.value)}/>
            <input placeholder="Subject" value={subjectField} 
              onChange={(event) => setSubjectField(event.target.value)}/>
            <input placeholder="Category" value={categoryField} 
              onChange={(event) => setCategoryField(event.target.value)}/>
            <input placeholder="Description" value={descriptionField} 
              onChange={(event) => setDescriptionField(event.target.value)}/>
            <input placeholder="Amount" value={amountField} 
              onChange={(event) => setAmountField(event.target.value)}/>
            <input placeholder="Description" value={durationField} 
              onChange={(event) => setDurationField(event.target.value)}/>
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

export default GrantModal;