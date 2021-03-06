// React
import { useEffect, useState } from "react";
import {Link} from "react-router-dom";

// Firebase
import {db, signOutUser} from "../../firebaseConfigDoc";
import { doc, onSnapshot, setDoc } from "firebase/firestore";

// Redux
// import { bindActionCreators } from "redux"
import { useSelector } from "react-redux";
// import {actionCreators} from "../../dataLayer/actionCreators"

// Icons
import {FaUserFriends} from 'react-icons/fa';
import {GoSignOut} from 'react-icons/go';
import {CgProfile} from 'react-icons/cg';

// components
import ProfileBox from "./ProfileBox";
import Widget from '../../components/Widget/Widget';

// Loaders
import Loader from "react-loader-spinner";

// CSS
import "./home.css";



function UserProfile() {
  const [userData, setUserData] = useState<any>({displayName: "", starRating: 0, numberOfFriends: 0, numberOfGroups: 0});
  const [isLoading, setIsLoading] = useState<string>("notReady");

  // const dispatch = useDispatch();
  // const {actionOne} = bindActionCreators(actionCreators, dispatch);
  const userDataLayer: any = useSelector((state: any) => state.user);


  useEffect(() => {

      onSnapshot(doc(db, "users", userDataLayer.payload.uid), { includeMetadataChanges: true }, (thisDoc) => {
        const data: any = thisDoc.data()
    
        if(data) {
          // console.log("Home server --------------------",thisDoc.metadata.fromCache ? "local cache" : "server", data)
          data.numberOfFriends = data.friendsList ? data.friendsList.filter((value: any) => {
            if(value.status === "friend"){
              return value;
            }
            return null;
          }).length : null;

          data.numberOfFriendrequests = data.friendsList ? data.friendsList.filter((value: any) => {
            if(value.status === "request"){
              return value;
            }
            return null;
          }).length : null;
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
            photoURL: userDataLayer.payload.photoURL,
            socialScore: 0,
            numberOfRatings: 0,
            starRatingHistory: []
          });
        }
        setIsLoading("ready");
      });
    
  },[userDataLayer.payload])

    return (
      <>
      {isLoading === "notReady" ? 
      <div className="loadingScreen">
        <Loader
          type="TailSpin"
          color="#00BFFF"
          height={100}
          width={100}
        /> 
      </div> :
      <>
       <Link to="/userprofile">
         <div className="cornerBtn homeBtn"><CgProfile  title="User Profile" className="icon"/></div>
        </Link>

      <div className="cornerBtn signOutBtn" onClick={signOutUser}><GoSignOut title="signOut" className="icon"/></div>

      <ProfileBox deslpayName={userDataLayer.payload.displayName} photoURL={userDataLayer.payload.photoURL} numberOfStars={(userData.socialScore / (userData.numberOfRatings > 0 ? userData.numberOfRatings : 1))}/>
      
      <section className="widgetBox">

        <Link to={{pathname: "/searchtable",state:{tableName: "Friends", collectionName: "users", requestListName: "friendRequests", listName:"friendsList"}}} className="linkBtn">
        <Widget type={"Friends"} numberOf={userData.numberOfFriends} icon={<FaUserFriends size="30px" title="Friends"/>} numOfNotes={userData.numberOfFriendrequests}/>
        </Link>

        {/* <Link to={{pathname: "/searchtable",state:{tableName: "Groups", collectionName: "groups", requestListName: "groupRequests", listName:"groupList"}}} className="linkBtn">
        <Widget type={"Groups"} numberOf={userData.numberOfGroups} icon={<BiNetworkChart size="30px" title="Groups"/>}/>
        </Link> */}

      </section>
      </>
      }</>
    );
  }
  
  export default UserProfile;
  