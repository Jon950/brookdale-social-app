// React
import { useEffect } from "react";
import {Link, useLocation} from "react-router-dom"

// Firebase
// import {db} from "../../firebaseConfigDoc";
// import { doc, onSnapshot } from "firebase/firestore";

// Data Layer
// import {userDataLayer} from "../../dataLayer"

// Icons
import {GoSignOut} from 'react-icons/go';
import {AiFillHome} from "react-icons/ai";

// components
import Table from "../subComponents/Table"




const SearchTable = () => { 
// const location: object = useLocation();
// const {tableName} = location.state;

// console.log(tableName)

  useEffect(() => {

  
    //   onSnapshot(doc(db, "users", userDataLayer.uid), (doc) => {
    //     const data: any = doc.data()
    //     console.log("server --------------------",data)
    //     userDataLayer.setAll(data);

    //     setUserData(userDataLayer.getUserData());
    //   });
   
  },[])

 
    return (
      <>
       <Link to="/">
         <div className="cornerBtn homeBtn"><AiFillHome size="25px" title="User Profile" className="icon"/></div>
        </Link>

      <div className="cornerBtn signOutBtn"><GoSignOut size="25px" title="signOut" className="icon"/></div>
      <Table tableName={"tableName"} list={[]} />
      </>
    );
  }
  
  export default SearchTable;
  