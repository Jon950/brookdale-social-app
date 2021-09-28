
// Firebase
// import {db} from "../../firebaseConfigDoc";
// import { doc, setDoc } from "firebase/firestore";

// Components
import FooterNav from "../subComponents/FooterNav";

interface FormProps {
  formName:string,
  formDescription: string
  
}

const FormPage: React.FC<FormProps> = ({formName, formDescription}) => {

    return (
      <div className="formPage">
        <h2>Create {formName}</h2>
        <p>{formDescription}</p>
        <form>
        <label htmlFor="nameID">{formName} name:</label>
        <input type="text" id="nameID" name="name"/>

        <label htmlFor="descriptionID">{formName} description:</label>
        <textarea id="descriptionID" name="description" maxLength={200}/>

        <label htmlFor="objectiveID">{formName} objective:</label>
        <textarea id="objectiveID" name="objective" maxLength={200}/>
        <button type="submit" onClick={(event) => event.preventDefault()}>Submit</button>
        </form>
        <FooterNav lastPage={{pathname: "/searchtable",state:{tableName: "Groups", collectionName: "groups", requestListName: "groupRequests", listName:"groupList"}}} />
      </div>
    );
  }
  
  export default FormPage;
  