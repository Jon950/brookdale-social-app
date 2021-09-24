// React
import {useEffect, useState} from "react"
import {Link} from "react-router-dom"

// Firebase
import {db, signOutUser} from "../../firebaseConfigDoc";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";

// Redux
import { useSelector } from "react-redux";

// components
import StarRatingBar from '../subComponents/StarRatingBar';

// Color Picker
import {CirclePicker} from "react-color";

// Icons
import {AiFillHome} from "react-icons/ai";
import {GoSignOut} from "react-icons/go";


function UserProfile() {
  const [userData, setUserData] = useState<any>({displayName: "", starRating: 0, numberOfFriends: 0, numberOfGroups: 0});
  const [isColoring, setIsColoring] = useState<boolean>(false);
  const [pickedColor, setPickedColor] = useState<any>({});

  const colorOptionList = ["#fc0303", "#E74C3C", "#F39C12", "#fc0398", 
  "#f003fc", "#8E44AD", "#0352fc", "#3498DB", "#01dae6",
  "#2ECC71", "#16A085", "#34495E"];

  const userDataLayer: any = useSelector((state: any) => state.user);

  useEffect(() => {

    onSnapshot(doc(db, "users", userDataLayer.payload.uid), (doc) => {
      const data: any = doc.data()
      if(data){
        console.log("server --------------------",data)

        document.documentElement.style.setProperty("--userColorR", data.favoriteColor.userColorR);
        document.documentElement.style.setProperty("--userColorG", data.favoriteColor.userColorG);
        document.documentElement.style.setProperty("--userColorB", data.favoriteColor.userColorB);

        setUserData(data);
      }
    });
    
  },[userDataLayer.payload.uid])

  const updateColor = (color: any) => {
    setPickedColor(color);
    document.documentElement.style.setProperty("--userColorR", color.r);
    document.documentElement.style.setProperty("--userColorG", color.g);
    document.documentElement.style.setProperty("--userColorB", color.b);
  }

  const saveColor = () => {
    if(isColoring && pickedColor.r){
      updateDoc(doc(db, "users", userDataLayer.payload.uid), {
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
         <div className="cornerBtn signOutBtn" onClick={signOutUser}><GoSignOut title="signOut" className="icon"/></div>

        {userDataLayer.payload.photoURL !== "" ? 
        <img src={userDataLayer.payload.photoURL} className="profilePicture" alt="User Profile Pic" width="200px" height="200px" />
        : <div className="profilePictureFillIn">{userDataLayer.payload.displayName[0]}</div>
        }
        <h4>{userDataLayer.payload.displayName}</h4>

        <StarRatingBar size="20px" numberOfStars={(userData.socialScore / userData.numberOfRatings)}/>

        <h5>{userDataLayer.payload.email}</h5>

        <div className="colorBar" onClick={() => {setIsColoring(!isColoring); saveColor()}}>Your favorite color</div>
        {isColoring ? <CirclePicker color={pickedColor} colors={colorOptionList} 
          onChangeComplete={color => updateColor(color.rgb)} /> : ""}
        
      </div>

  );
}

export default UserProfile;
