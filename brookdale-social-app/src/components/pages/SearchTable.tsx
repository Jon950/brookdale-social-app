// React
import { useEffect } from "react";
import {Link} from "react-router-dom"

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


interface SearchTableProps {
    deslpayName:string,
    profilePicUrl: string,
    numberOfStars: number,
   
  }


const SearchTable: React.FC<SearchTableProps> = ({deslpayName, profilePicUrl, numberOfStars}) => { 


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
      <Table tableName={""} list={[{}]} />
      </>
    );
  }
  
  export default SearchTable;
  