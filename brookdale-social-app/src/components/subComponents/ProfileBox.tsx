// React
import React, {useEffect} from 'react';

// components
import StarRatingBar from './StarRatingBar';

// Icons
// import {BsStarFill} from "react-icons/bs";


function ProfileBox() {
  // const [userData, setUserData] = useState({profilePicUrl: "", deslpayName: "John Smith"})
  // const [numberOfStars, setnumberOfStars] = useState( 0);

  const userData = {profilePicUrl: "", deslpayName: "John Smith"};
  const numberOfStars =  3.5;

  useEffect(() =>{
    
  },[])

  
 
  return (
    <>
      <div className="profilePictureBox">
        {userData.profilePicUrl !== "" ? 
        <img src={userData.profilePicUrl} className="profilePicture" alt="User Profile Pic" />
        : <div className="profilePictureFillIn">{userData.deslpayName[0]}</div>
        }
        <h4>{userData.deslpayName}</h4>
        <StarRatingBar numberOfStars={numberOfStars}/>
      </div>
    </>
  );
}

export default ProfileBox;
