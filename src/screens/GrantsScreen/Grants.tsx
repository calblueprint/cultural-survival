import { StyleSheet, Text, View } from "react-native";
import { useAuthentication } from "../../utils/hooks/useAuthentication";
import { Button } from "react-native-elements";
import { getAuth, signOut } from "firebase/auth";
import React, {useEffect, useState} from 'react'
import { getAllGrants, addGrant, getGrant, deleteGrant, editGrant} from '../../firebase/firestore/grants'; 
import { Grant } from "../../types/schema"; 
import  GrantModal  from "../../components/AdminComponents/GrantModal"
import ViewContainer from "../../components/ViewContainer";
import RectButton from "../../components/RectButton";
import globalStyles from "../../globalStyles";
import styles from "./styles";

const defaultGrant: Grant = {
  amount: 0,
  grant_id: "",
  category: "",
  countries: [],
  deadline: new Date(),
  description: "",
  duration: ",",
  subject: "",
  title: "",
}

const auth = getAuth();
const GrantsScreen = ({ navigation }: any) => {
  const { user } = useAuthentication();
  // const[categoryField, setCategoryField] = useState("");
  // const[countriesField, setCountriesField] = useState(""); // set as string temporarily 
  // const[deadlineField, setDeadlineField] = useState(""); // set as string temporarily 
  // const[descriptionField, setDescriptionField] = useState("");
  // const[subjectField, setSubjectField] = useState("");
  // const[titleField, setTitleField] = useState("");
  // const[durationField, setDurationField] = useState("");
  // const[amountField, setAmountField] = useState("");

  const[grant, setGrant] = useState(defaultGrant);
  const[grants, setGrants] = useState([] as Grant[]); 


  useEffect(() => {

    const displayGrants = async () => {
      //const grant = await getGrant("M9ytyRWHtepT9DhzrmZI");
      const data = await getAllGrants();
      setGrants(data);
    };

    displayGrants();
  })

  useEffect(() => {

  }, [grants])

  const onDelete = (grantID : string) => {
    if (grantID != "pz6WEgDiZbOW6tlYS9Am") {
      deleteGrant(grantID);
      setGrants(grants.filter(grant => grant.grant_id != grantID)) // try this instead of all the ugly messy lines
      // const newGrants = grants;
      // grants.map((grant) => {
      //   if (grant.grant_id != grantID) {
      //     newGrants.push(grant)
      //   }
      // })
      // setGrants(newGrants);
    }
  };

  const onEdit = async (grantID : string) => {
    if (grant.grant_id != "pz6WEgDiZbOW6tlYS9Am") {
      editGrant(grant.grant_id, 23, "new", ["new"], new Date(), "new", "new", "new", "new"); 
      const updatedGrant = await getGrant(grant.grant_id);
  
      setGrants(grants.map(grant => {
        if (grant.grant_id == grantID) {
          console.log("edited");
          return updatedGrant // should be updated grant here
        } else {
          return grant
        }
      }));
    }

  };

  const handleGrantSubmit = async (grant: Grant) => {
    setGrants([grant, ...grants]);
    // if (categoryField != "" && amountField != "" && descriptionField != "" &&
    //       durationField != "" && subjectField != "" && titleField != "") { 

    //   const grant: any = {
    //     amount: amountField,
    //     category: categoryField,
    //     countries: ["Country1", "Country2"], // update later once multiling support w inputs is researched
    //     deadline: new Date(), // update later once multiling support w inputs is researched
    //     description: descriptionField,
    //     duration: durationField,
    //     subject: subjectField,
    //     title: titleField,
    //   }


      // addGrant(grant);
      // const newGrants = grants;
      // newGrants.push(grant);
      // setGrants(newGrants); 
      // try setGrants([grant, ...grants]); instead of prev 3 lines
      

      // setAmountField("")
      // setCategoryField("")
      // setCountriesField("")
      // setDeadlineField("")
      // setDescriptionField("")
      // setDurationField("")
      // setSubjectField("")
      // setTitleField("")
    //}
  }


  return (
    <ViewContainer>
      <GrantModal onNewGrant={handleGrantSubmit}/>

       <Text style={globalStyles.h2}>Grants Feed</Text>
       <RectButton
         text="Back"
         buttonStyle={{ marginTop: "5%", backgroundColor: "#253C85" }}
         textStyle={{ color: "#FFF" }}
         onPress={() => navigation.navigate("Home")}
       /> 
       <div>
        {grants.map((grant) => {

          return (
          <div key={grant.grant_id}>  
            <h6>Title: {grant.title}</h6>
            <h6>Amount: {grant.amount}</h6>
            <h6>Countries: {grant.countries.join(", ")}</h6>
            <h6>Deadline: {grant.description}</h6>
            <h6>Description: {grant.description}</h6>
            <h6>Duration: {grant.duration}</h6>
            <h6>Subject: {grant.subject}</h6>
            <h6>Deadline: {grant.category}</h6>

            <button 
              onClick={() => onDelete(grant.grant_id)}>
                Delete Grant
            </button>

            <button 
              onClick={async () => onEdit(grant.grant_id)}>
                Update Grant
            </button>
          </div>
          );

           })}
      </div>
  
     </ViewContainer>
  );
};


export default GrantsScreen;
