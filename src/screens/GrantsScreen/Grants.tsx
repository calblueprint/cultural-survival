import { StyleSheet, Text, View } from "react-native";
import { useAuthentication } from "../../utils/hooks/useAuthentication";
import { Button } from "react-native-elements";
import { getAuth, signOut } from "firebase/auth";
import React, {useEffect, useState} from 'react'
import { getAllGrants, addGrant, getGrant, deleteGrant, editGrant} from '../../firebase/firestore/grants'; 
import { Grant } from "../../types/schema"; 
import  AddGrantModal  from "../../components/AdminComponents/AddGrantModal/AddGrantModal"
import ViewContainer from "../../components/ViewContainer";
import RectButton from "../../components/RectButton";
import globalStyles from "../../globalStyles";
import styles from "./styles";
import EditGrantModal from "../../components/AdminComponents/AddGrantModal/EditGrantModal";


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

  const[grant, setGrant] = useState(defaultGrant); 
  const[grants, setGrants] = useState([] as Grant[]); 
  
  //const[grantsWithFunc, setGrantsWithFunc] = useState(async () => await getAllGrants());// this may fix the issue with running getAllGrants within useEffect


  useEffect(() => {
    const displayGrants = async () => {
      const data = await getAllGrants();
      setGrants(data);
    };

    displayGrants();
  })

  // useEffect(() => {

  // }, [grants])

  const onDelete = (grantID : string) => {
    if (grantID != "pz6WEgDiZbOW6tlYS9Am") {
      deleteGrant(grantID);
      setGrants(grants.filter(grant => grant.grant_id != grantID)) 
    }
  };

  const handleGrantSubmit = async (grant: Grant) => {
    setGrants([grant, ...grants]);
  };

  const handleGrantEdit = async (grantID: string) => {setGrants(grants.map(async grant => {
    if (grant.grant_id == grantID) {
      const updatedGrant = await getGrant(grantID);
      return updatedGrant

    } else {
      return grant
    }
  }) as [])   
  };



  return (
    <ViewContainer>
      <AddGrantModal onNewGrant={handleGrantSubmit}/>

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
            <h6>Category: {grant.category}</h6>
            <h6>Countries: {grant.countries.join(", ")}</h6>
            <h6>Deadline: {grant.description}</h6> 
            <h6>Description: {grant.description}</h6>
            <h6>Duration: {grant.duration}</h6>
            <h6>Subject: {grant.subject}</h6>
            

            <button 
              onClick={() => onDelete(grant.grant_id)}>
                Delete Grant
            </button>

            <button 
              onClick={() => {
                if (grant.grant_id != "pz6WEgDiZbOW6tlYS9Am") {
                  editGrant(grant.grant_id, 23, "newCategory", ["NewCountry1", "NewCountry2"], "NewDescription", "NewDuration", "NewSubject", "UpdatedTitle");
                }
              }}>
                Update Grant
            </button>
            <EditGrantModal grant={grant} onEdit={handleGrantEdit} grantID={grant.grant_id}/>
          </div>
          );

           })}
      </div>
  
     </ViewContainer>
  );
};


export default GrantsScreen;
