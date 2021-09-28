// React
import {useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom"

// Firebase
import {db, signOutUser} from "../../firebaseConfigDoc";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";

// Redux
import { useSelector } from "react-redux";

// components
import StarRatingBar from '../subComponents/StarRatingBar';
import FooterNav from "../subComponents/FooterNav";

// Color Picker
import {CirclePicker} from "react-color";

// Icons
import {AiFillHome} from "react-icons/ai";
import {GoSignOut} from "react-icons/go";


const GroupProfile = () => {
  const location: any = useLocation();

  const [groupData, setGroupData] = useState<any>({displayName: "", starRating: 0, numberOfFriends: 0, numberOfGroups: 0});
  const [isColoring, setIsColoring] = useState<boolean>(false);
  const [pickedColor, setPickedColor] = useState<any>({});

  const colorOptionList = ["#fc0303", "#E74C3C", "#F39C12", "#fc0398", 
  "#f003fc", "#8E44AD", "#0352fc", "#3498DB", "#01dae6",
  "#2ECC71", "#16A085", "#34495E"];

  const userDataLayer: any = useSelector((state: any) => state.user);


  useEffect(() => {

    onSnapshot(doc(db, "groups", location.state.displayName + "-" + userDataLayer.payload.uid), (doc) => {
      const data: any = doc.data();
      if(data){
        console.log("server --------------------",data);

        document.documentElement.style.setProperty("--userColorR", data.favoriteColor.userColorR);
        document.documentElement.style.setProperty("--userColorG", data.favoriteColor.userColorG);
        document.documentElement.style.setProperty("--userColorB", data.favoriteColor.userColorB);

        setGroupData(data);
      }
    });
    
  },[location.state.displayName, userDataLayer.payload.uid])

  const updateColor = (color: any) => {
    setPickedColor(color);
    document.documentElement.style.setProperty("--userColorR", color.r);
    document.documentElement.style.setProperty("--userColorG", color.g);
    document.documentElement.style.setProperty("--userColorB", color.b);
  }

  const saveColor = () => {
    if(isColoring && pickedColor.r){
      updateDoc(doc(db, "groups", location.state.displayName + "-" + userDataLayer.payload.uid), {
      favoriteColor: {
        userColorR: pickedColor.r,
        userColorG: pickedColor.g,
        userColorB: pickedColor.b,
      },
    });}
  }


  return (
  
       <div className="UserProfile">
         <Link to="/">
         <div className="cornerBtn homeBtn"><AiFillHome  title="signOut" className="icon"/></div>
         </Link>
         <Link to="/">
         <div className="cornerBtn signOutBtn" onClick={signOutUser}><GoSignOut title="signOut" className="icon"/></div>
         </Link>
         
        {groupData.photoURL !== "" ? 
        <img src={groupData.photoURL} className="profilePicture" alt="Group Profile Pic" width="200px" height="200px" />
        : <div className="profilePictureFillIn">{groupData.displayName[0]}</div>
        }
        <h4>{groupData.displayName}</h4>

        <StarRatingBar size="20px" numberOfStars={(groupData.socialScore / (groupData.numberOfRatings > 0 ? groupData.numberOfRatings : 1))}/>

        <h5>Description</h5>
        <p>{groupData.description}</p>

        <h5>Objective</h5>
        <p>{groupData.objective}</p>

        <div className="colorBar" onClick={() => {setIsColoring(!isColoring); saveColor()}}>Group color</div>
        {isColoring ? <CirclePicker color={pickedColor} colors={colorOptionList} 
          onChangeComplete={color => updateColor(color.rgb)} /> : ""}
        
        <FooterNav  />
      </div>

  );
}

export default GroupProfile;
