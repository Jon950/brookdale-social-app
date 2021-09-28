
// Firebase
import {db} from "../../firebaseConfigDoc";
import { doc, setDoc } from "firebase/firestore";


// Redux
import { useSelector } from "react-redux";

// Pages
import GroupProfile from "../pages/GroupProfile";

// Components
import { useState } from "react";
import FooterNav from "../subComponents/FooterNav";

interface FormProps {
  formName:string,
  formDescription: string
  
}

const FormPage: React.FC<FormProps> = ({formName, formDescription}) => {

  const userDataLayer: any = useSelector((state: any) => state.user);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [objective, setObjective] = useState("");



  const submitForm = () => {
    console.log("name", userDataLayer.payload.uid, name, description, objective);

    const letterArray = []
          let index = 3;
          while (index <= name.length) {

            letterArray.push(name.slice(0,index).toLowerCase());
            ++index;
          }

    setDoc(doc(db, "groups", name + "-" + userDataLayer.payload.uid), {
      displayName: name,
      description,
      objective,
      author_uid: userDataLayer.payload.uid,
      userNameArray: letterArray,
      favoriteColor: {userColorR: 154,
                      userColorG: 140,
                      userColorB: 201},
      friendsList: [],
      profilePicUrl: "",
      socialScore: 0,
      numberOfRatings: 0,
    });
  }

    return (
      <>
      {false ?
      <div className="formPage">
        <h2>Create {formName}</h2>
        <p>{formDescription}</p>
        <form onSubmit={(event) => {event.preventDefault(); submitForm()}}>
        <label htmlFor="nameID">{formName} name:</label>
        <input type="text" id="nameID" name="name" onChange={(event:any) => setName(event.target.value)} required/>

        <label htmlFor="descriptionID">{formName} description:</label>
        <textarea id="descriptionID" name="description" maxLength={200} onChange={(event:any) => setDescription(event.target.value)} required/>

        <label htmlFor="objectiveID">{formName} objective:</label>
        <textarea id="objectiveID" name="objective" maxLength={200} onChange={(event:any) => setObjective(event.target.value)} required/>
        <button type="submit" >Submit</button>
        </form>
        <FooterNav lastPage={{pathname: "/searchtable",state:{tableName: "Groups", collectionName: "groups", requestListName: "groupRequests", listName:"groupList"}}} />
      </div>
      : 
      <GroupProfile />
      }
      </>
    );
  }
  
  export default FormPage;
  