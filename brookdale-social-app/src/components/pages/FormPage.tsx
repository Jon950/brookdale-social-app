// React
import { useHistory } from "react-router-dom";

// Firebase
import {db} from "../../firebaseConfigDoc";
import { doc, setDoc, runTransaction } from "firebase/firestore";

// Redux
import { useSelector } from "react-redux";

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

  const history = useHistory();



  const submitForm = () => {

    const letterArray = []
          let index = 3;
          while (index <= name.length) {

            letterArray.push(name.slice(0,index).toLowerCase());
            ++index;
          }
          const data = {
            displayName: name,
            description,
            objective,
            author_uid: userDataLayer.payload.uid,
            userNameArray: letterArray,
            favoriteColor: {userColorR: 154,
                            userColorG: 140,
                            userColorB: 201},
            friendsList: [],
            photoURL: "",
            socialScore: 0,
            numberOfRatings: 0,
          };

    setDoc(doc(db, "groups", name + "-" + userDataLayer.payload.uid), data);

    const thisUserDocRef = doc(db, "users", userDataLayer.payload.uid);
      try {
        runTransaction(db, async (transaction) => {
          const sfDoc = await transaction.get(thisUserDocRef);
          if (!sfDoc.exists()) {
            throw console.log("Document does not exist!");
          }

          const newPopulation = sfDoc.data().groupList;

          
            if(newPopulation.findIndex((object: any, index:number) => {
              return object.author_uid === userDataLayer.payload.uid;
            }) === - 1) {
              newPopulation.push(data);
            }


          transaction.update(thisUserDocRef, { groupList: newPopulation });
          console.log("DDFSDF", newPopulation)
        });
        console.log("Transaction successfully committed!");
      } catch (e) {
        console.log("Transaction failed: ", e);
      }

    history.push({
      pathname: '/groupprofile',
      state: data
    });
  }

    return (
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
        
        <button type="submit">Submit</button>
        
        </form>
        <FooterNav />
      </div>
    );
  }
  
  export default FormPage;
  