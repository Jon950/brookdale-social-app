// React
import { useEffect, useState } from "react";
import {Link, useLocation} from "react-router-dom"

// Firebase
import {db} from "../../firebaseConfigDoc";
import { doc, onSnapshot } from "firebase/firestore";

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

// const list: Array<Object> = [
//   {name: "Jon", profilePicUrl: "", starRating: 4, uid: "43h6iu5"},
//   {name: "Tim", profilePicUrl: "", starRating: 4.5, uid: "35g4j"},
//   {name: "Mike", profilePicUrl: "", starRating: 3, uid: "23hj45k3"},
//   {name: "Jon", profilePicUrl: "", starRating: 4, uid: "43hiu5"},
//   {name: "Tim", profilePicUrl: "", starRating: 4.5, uid: "35gk4j"},
//   {name: "Mike", profilePicUrl: "", starRating: 3, uid: "23hsj45k3"},
//   {name: "Jon", profilePicUrl: "", starRating: 4, uid: "436iu5"},
//   {name: "Tim", profilePicUrl: "", starRating: 4.5, uid: "35fg4j"},
//   {name: "Mike", profilePicUrl: "", starRating: 3, uid: "23h45k3"},
//   {name: "Jon", profilePicUrl: "", starRating: 4, uid: "43h6aiu5"},
//   {name: "Tim", profilePicUrl: "", starRating: 4.5, uid: "35kkg4j"},
//   {name: "Mike", profilePicUrl: "", starRating: 3, uid: "23hjw45k3"},
//   {name: "Mike", profilePicUrl: "", starRating: 3, uid: "23hjw4l5k3"}

// ]

  useEffect(() => {

      onSnapshot(doc(db, "users", "4oEsjBBDA2yxz4nItBbY"), (doc: any) => {
        const data: any = doc.data()
        console.log("ST --------------------",data)
      

        if(data.friendsList.length > 0) {
          setList(data[location.state.lists]);
        }
      });
   
  },[location])

 
    return (
      <>
       <Link to="/">
         <div className="cornerBtn homeBtn"><AiFillHome size="25px" title="User Profile" className="icon"/></div>
        </Link>

      <div className="cornerBtn signOutBtn"><GoSignOut size="25px" title="signOut" className="icon"/></div>
      <Table tableName={location.state.tableName} list={list} />
      </>
    );
  }
  
  export default SearchTable;
  