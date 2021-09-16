// React
import { useEffect, useState } from "react";
import {Link} from "react-router-dom"

// Firebase
import {db} from "../../firebaseConfigDoc";
import { doc, onSnapshot } from "firebase/firestore";

// Icons
import {FaUserFriends} from 'react-icons/fa';
import {BiNetworkChart} from 'react-icons/bi';
import {GoSignOut} from 'react-icons/go';
import {CgProfile} from 'react-icons/cg';

// components
import ProfileBox from "../subComponents/ProfileBox"
import Widget from '../subComponents/Widget';



function UserProfile() {
  const [userData, setUserData] = useState<any>({displayName: "John Smith", starRating: 0, numberOfFriends: 0, numberOfGroups: 0})


  useEffect(() => {
    onSnapshot(doc(db, "users", "4oEsjBBDA2yxz4nItBbY"), (doc) => {
      const data: any = doc.data()
      setUserData(data);
  });

  },[])

 
    return (
      <>
       <Link to="/userprofile">
         <div className="cornerBtn homeBtn"><CgProfile size="20px" title="User Profile" className="icon"/></div>
        </Link>

      <div className="cornerBtn signOutBtn"><GoSignOut size="20px" title="signOut" className="icon"/></div>

      <ProfileBox deslpayName={userData.displayName} profilePicUrl={""} numberOfStars={userData.starRating}/>
      
      <section className="widgetBox">
        <Widget type={"Friends"} numberOf={userData.numberOfFriends} icon={<FaUserFriends size="30px" title="Friends"/>}/>
        <Widget type={"Groups"} numberOf={userData.numberOfGroups} icon={<BiNetworkChart size="30px" title="Groups"/>}/>
      </section>
     
      </>
    );
  }
  
  export default UserProfile;
  