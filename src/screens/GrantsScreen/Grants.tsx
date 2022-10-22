import { StyleSheet, Text, View } from "react-native";
import { useAuthentication } from "../../utils/hooks/useAuthentication";
import { Button } from "react-native-elements";
import { getAuth, signOut } from "firebase/auth";
import React, {useEffect, useState} from 'react'
import { getAllGrants, addGrant, getGrant, deleteGrant, updateGrantTitle} from '../../firebase/firestore/grants'; 
import  { onSnapshot} from "firebase/firestore";
import { Grant } from "../../types/schema"; 
import styles from "./styles";

const defaultGrant: Grant = {
  grant_id: "",
  category: "",
  countries: [],
  deadline: new Date(),
  description: "",
  subject: "",
  title: "",

}


const auth = getAuth();
const GrantsScreen = ({ navigation }: any) => {
  const { user } = useAuthentication();
  const[categoryField, setCategoryField] = useState("");
  const[countriesField, setCountriesField] = useState([]);
  const[deadlineField, setDeadlineField] = useState(new Date());
  const[descriptionField, setDescriptionField] = useState("");
  const[subjectField, setsubjectField] = useState("");
  const[titleField, setTitleField] = useState("");


  const[grant, setGrant] = useState(defaultGrant);
  const[grants, setGrants] = useState([] as Grant[]); // will probs be the most helpful for displaying updates!! after updating just run get allgrants and setgrants


  useEffect(() => {

    const displayGrants = async () => {
      //const grant = await getGrant("M9ytyRWHtepT9DhzrmZI");
      const data = await getAllGrants();
      setGrants(data);
    };

    displayGrants();
  }, [grants])

  const deleteGrantHelper = (grantID : string) => {
    const newGrants = grants;
    grants.forEach((grant) => {
      if (grant.grant_id != grantID) {
        newGrants.push(grant)
      }
    })
    setGrants(newGrants);
  };

  const updateGrantHelper = async (grantID : string) => {
    const newGrants = grants;
    newGrants.forEach((grant) => {
      if (grant.grant_id == grantID) {

      }
      

    })

    setGrants(newGrants);

  };

  const handleSubmit = () => {
    if (true) { // fix this so it checks that the fields are not empty
      const dummyGrant: any = {
        category: "dummy-category",
        countries: ["dummyCountry1", "dummyCountry2"],
        deadline: new Date(),
        description: "dummyDescription",
        subject: "dummySubject",
        title: "dummySubject",
      
      }
      addGrant(dummyGrant);

    }
  }

  const addGrantHelper = async (grantID : string) => {
    const newGrants = grants;
    setGrant(await getGrant(grantID));
    newGrants.push(grant);
    setGrants(newGrants);

  }


  

  return (
    <View style={styles.container}>

      <div>
        {grants.map((grant) => {

          return (
          <div key={grant.grant_id}>  
            <h6>Title: {grant.title}</h6>
            <h6>Countries: {grant.countries.join(", ")}</h6>
            <h6>Description: {grant.description}</h6>
            <h6>Subject: {grant.subject}</h6>
            <h6>Deadline: {grant.category}</h6>

            <button 
              onClick={() => {
                if (grant.grant_id != "M9ytyRWHtepT9DhzrmZI") {
                  deleteGrant(grant.grant_id);
                  deleteGrantHelper(grant.grant_id);
                }
              }}>
                Delete Grant
            </button>

            <button 
              onClick={async () => {
                if (grant.grant_id != "M9ytyRWHtepT9DhzrmZI") {
                  updateGrantTitle(grant.grant_id, "Updated Title");
                  const data = await getAllGrants();
                  setGrants(data);
                }
              }}>
                Update Grant
            </button>
          </div>
          );

           })}
      </div>

      <Text>Grants Feed</Text>
      <input placeholder="Title"/>
      <input placeholder="Subject"/>
      <input placeholder="Category"/>
      <input placeholder="Description"/>
      <input type="datetime-local"/>
      <input placeholder="Countries"/>

      <button onClick={handleSubmit}>Add Grant</button>
  
      <Button
        title="Back"
        style={styles.button}
        onPress={() => navigation.navigate("Home")}
      />
      
    </View>
  );
};


export default GrantsScreen;
