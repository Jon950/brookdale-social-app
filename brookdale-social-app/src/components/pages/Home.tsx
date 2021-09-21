// React
import { useEffect, useState } from "react";
import {Link} from "react-router-dom"

// Firebase
import {db} from "../../firebaseConfigDoc";
import { doc, onSnapshot } from "firebase/firestore";

// Data Layer
// import {userDataLayer} from "../../dataLayer"

// Icons
import {FaUserFriends} from 'react-icons/fa';
import {BiNetworkChart} from 'react-icons/bi';
import {GoSignOut} from 'react-icons/go';
import {CgProfile} from 'react-icons/cg';

// components
import ProfileBox from "../subComponents/ProfileBox"
import Widget from '../subComponents/Widget';



function UserProfile() {
  const [userData, setUserData] = useState<any>({displayName: "", starRating: 0, numberOfFriends: 0, numberOfGroups: 0})


  useEffect(() => {

      onSnapshot(doc(db, "users", "4oEsjBBDA2yxz4nItBbY"), { includeMetadataChanges: true }, (doc) => {
        const data: any = doc.data()
        console.log("Home server --------------------",doc.metadata.fromCache ? "local cache" : "server", data)
        data.numberOfFriends = data.friendsList.length;
        data.numberOfGroups = data.groupList.length;
        setUserData(data);
      });
    
  },[])

 
    return (
      <>
       <Link to="/userprofile">
         <div className="cornerBtn homeBtn"><CgProfile size="25px" title="User Profile" className="icon"/></div>
        </Link>

      <div className="cornerBtn signOutBtn"><GoSignOut size="25px" title="signOut" className="icon"/></div>

      <ProfileBox deslpayName={userData.displayName} profilePicUrl={""} numberOfStars={userData.starRating}/>
      
      <section className="widgetBox">

        <Link to={{pathname: "/searchtable",state:{tableName: "Friends", listName:"friendsList"}}} className="linkBtn">
        <Widget type={"Friends"} numberOf={userData.numberOfFriends} icon={<FaUserFriends size="30px" title="Friends"/>}/>
        </Link>

        <Link to={{pathname: "/searchtable",state:{tableName: "Groups", listName:"groupList"}}} className="linkBtn">
        <Widget type={"Groups"} numberOf={userData.numberOfGroups} icon={<BiNetworkChart size="30px" title="Groups"/>}/>
        </Link>

      </section>
     
      </>
    );
  }
  
  export default UserProfile;
  