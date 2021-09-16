// React
import {useEffect, useState} from "react"
import {Link} from "react-router-dom"

// Firebase
import {db} from "../../firebaseConfigDoc";
import { doc, onSnapshot } from "firebase/firestore";

// Data Layer
import {userDataLayer} from "../../dataLayer"

// components
import StarRatingBar from '../subComponents/StarRatingBar';

// Icons
import {AiFillHome} from "react-icons/ai";
import {GoSignOut} from "react-icons/go";



function UserProfile() {
  const [userData, setUserData] = useState<any>({displayName: "", starRating: 0, numberOfFriends: 0, numberOfGroups: 0})


  useEffect(() => {

    console.log("userData",userDataLayer.getUserData());

    if(userDataLayer.getUserData().displayName === "") {
      onSnapshot(doc(db, "users", userDataLayer.uid), (doc) => {
        const data: any = doc.data()
        console.log("server --------------------",data)
        userDataLayer.setAll(data);

        setUserData(userDataLayer.getUserData());
      });
    } else {
      setUserData(userDataLayer.getUserData());
    }
  },[])

    

  return (
  
       <div className="UserProfile">
         <Link to="/">
         <div className="cornerBtn homeBtn"><AiFillHome size="25px" title="signOut" className="icon"/></div>
         </Link>
         <div className="cornerBtn signOutBtn"><GoSignOut size="25px" title="signOut" className="icon"/></div>

        {userData.profilePicUrl !== "" ? 
        <img src={userData.profilePicUrl} className="profilePicture" alt="User Profile Pic" width="200px" height="200px" />
        : <div className="profilePictureFillIn">{userData.displayName[0]}</div>
        }
        <h4>{userData.displayName}</h4>
        <StarRatingBar numberOfStars={3.5}/>
        <h5>{userData.email}</h5>
        <div className="colorBar" style={{backgroundColor: userData.favoriteColor}}>Your favorite color</div>
      </div>

  );
}

export default UserProfile;
