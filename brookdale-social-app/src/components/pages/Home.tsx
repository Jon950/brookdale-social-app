// React
import { useEffect, useState } from "react";
import {Link} from "react-router-dom"

// Firebase
import {db, signOutUser} from "../../firebaseConfigDoc";
import { doc, onSnapshot, setDoc } from "firebase/firestore";

// Redux
// import { bindActionCreators } from "redux"
import { useSelector } from "react-redux";
// import {actionCreators} from "../../dataLayer/actionCreators"

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

  // const dispatch = useDispatch();
  // const {actionOne} = bindActionCreators(actionCreators, dispatch);
  const userDataLayer: any = useSelector((state: any) => state.user);


  useEffect(() => {
console.log("DS",userDataLayer.payload.displayName.length)
      onSnapshot(doc(db, "users", userDataLayer.payload.uid), { includeMetadataChanges: true }, (thisDoc) => {
        const data: any = thisDoc.data()
    
        if(data) {
          // console.log("Home server --------------------",thisDoc.metadata.fromCache ? "local cache" : "server", data)
          data.numberOfFriends = data.friendsList ? data.friendsList.length : null;
          data.numberOfGroups = data.groupList ? data.groupList.length : null;

          document.documentElement.style.setProperty("--userColorR", data.favoriteColor.userColorR);
          document.documentElement.style.setProperty("--userColorG", data.favoriteColor.userColorG);
          document.documentElement.style.setProperty("--userColorB", data.favoriteColor.userColorB);

          setUserData(data);
        } else {
          const letterArray = []
          let index = 3;
          while (index <= userDataLayer.payload.displayName.length) {

            letterArray.push(userDataLayer.payload.displayName.slice(0,index).toLowerCase());
            ++index;
          }
        
          setDoc(doc(db, "users", userDataLayer.payload.uid), {
            displayName: userDataLayer.payload.displayName,
            userNameArray: letterArray,
            favoriteColor: {userColorR: 154,
                            userColorG: 140,
                            userColorB: 201},
            friendsList: [],
            groupList: [],
            profilePicUrl: userDataLayer.payload.photoURL,
            starRating: 0
          });
        }
      });
    
  },[userDataLayer.payload])
 
  console.log(userDataLayer.payload)
    return (
      <>
       <Link to="/userprofile">
         <div className="cornerBtn homeBtn"><CgProfile  title="User Profile" className="icon"/></div>
        </Link>

      <div className="cornerBtn signOutBtn" onClick={signOutUser}><GoSignOut title="signOut" className="icon"/></div>

      <ProfileBox deslpayName={userDataLayer.payload.displayName} profilePicUrl={userDataLayer.payload.photoURL} numberOfStars={userData.starRating}/>
      
      <section className="widgetBox">

        <Link to={{pathname: "/searchtable",state:{tableName: "Friends", collectionName: "users", listName:"friendsList"}}} className="linkBtn">
        <Widget type={"Friends"} numberOf={userData.numberOfFriends} icon={<FaUserFriends size="30px" title="Friends"/>}/>
        </Link>

        <Link to={{pathname: "/searchtable",state:{tableName: "Groups", collectionName: "groups", listName:"groupList"}}} className="linkBtn">
        <Widget type={"Groups"} numberOf={userData.numberOfGroups} icon={<BiNetworkChart size="30px" title="Groups"/>}/>
        </Link>

      </section>
     
      </>
    );
  }
  
  export default UserProfile;
  