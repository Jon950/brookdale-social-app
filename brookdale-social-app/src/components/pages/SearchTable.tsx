// React
import { useEffect, useState } from "react";
import {Link, useLocation} from "react-router-dom"

// Firebase
import {db, signOutUser} from "../../firebaseConfigDoc";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";

// Redux
import { useSelector } from "react-redux";

// Icons
import {GoSignOut} from 'react-icons/go';
import {AiFillHome} from "react-icons/ai";

// components
import Table from "../subComponents/Table"




const SearchTable = () => {
const userDataLayer: any = useSelector((state: any) => state.user);
const location: any = useLocation();
const [list, setList] = useState<Array<Object>>([])
const [userData, setUserData] = useState<Object>({})

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
        
        updateDoc(doc(db, "users", userDataLayer.payload.uid), {
          [location.state.listName]: list
        });
      }
    });
  })
}

  useEffect(() => {

    onSnapshot(doc(db, "users", userDataLayer.payload.uid), (doc: any) => {
      const data: any = doc.data()
      data.uid = doc.id;

      if(data) {
        document.documentElement.style.setProperty("--userColorR", data.favoriteColor.userColorR);
        document.documentElement.style.setProperty("--userColorG", data.favoriteColor.userColorG);
        document.documentElement.style.setProperty("--userColorB", data.favoriteColor.userColorB);
        
        setUserData(data);

        if(data.friendsList.length > 0) {
          setList(data[location.state.listName]);
        }
      }
    });
   
  },[location, userDataLayer.payload.uid])

 
    return (
      <>
       <Link to="/">
         <div className="cornerBtn homeBtn"><AiFillHome  title="User Profile" className="icon"/></div>
        </Link>

      <div className="cornerBtn signOutBtn" onClick={signOutUser}><GoSignOut  title="signOut" className="icon"/></div>
      <Table tableName={location.state.tableName} collectionName={location.state.collectionName} 
       list={list} requestListName={location.state.requestListName} listName={location.state.listName} setList={setList} test={addNewUser}  userData={userData}/>
      </>
    );
  }
  
  export default SearchTable;
  