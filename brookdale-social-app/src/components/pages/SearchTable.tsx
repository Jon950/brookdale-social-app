// React
import { useEffect, useState } from "react";
import {Link, useLocation} from "react-router-dom"

// Firebase
import {db} from "../../firebaseConfigDoc";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";

// Data Layer
// import {userDataLayer} from "../../dataLayer"

// Icons
import {GoSignOut} from 'react-icons/go';
import {AiFillHome} from "react-icons/ai";

// components
import Table from "../subComponents/Table"




const SearchTable = () => {
const location: any = useLocation();
const [list, setList] = useState<Array<Object>>([])

const addNewUser = () => {
  fetch("https://randomuser.me/api/").then(response  => {
    response.json().then(data => {
      console.log("fetch", data.results[0])
      list.push({
        displayName: data.results[0].name.first, 
        profilePicUrl: data.results[0].picture.thumbnail,
        starRating: Math.floor(Math.random() * 5), 
        uid: data.results[0].email})

      if(list.length > 0){
        const docRef = doc(db, "users", "4oEsjBBDA2yxz4nItBbY");
        updateDoc(docRef, {
          [location.state.listName]: list
        });
      }
    });
  })
}

  useEffect(() => {

      onSnapshot(doc(db, "users", "4oEsjBBDA2yxz4nItBbY"), (doc: any) => {
        const data: any = doc.data()
        console.log("ST --------------------",data)
      

        if(data.friendsList.length > 0) {
          setList(data[location.state.listName]);
        }
      });
   
  },[location])

 
    return (
      <>
       <Link to="/">
         <div className="cornerBtn homeBtn"><AiFillHome size="25px" title="User Profile" className="icon"/></div>
        </Link>

      <div className="cornerBtn signOutBtn"><GoSignOut size="25px" title="signOut" className="icon"/></div>
      <Table tableName={location.state.tableName} list={list} test={addNewUser} />
      </>
    );
  }
  
  export default SearchTable;
  