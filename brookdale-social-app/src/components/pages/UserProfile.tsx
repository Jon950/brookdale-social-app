// React

// components
import StarRatingBar from '../subComponents/StarRatingBar';

// Icons
// import {BsStarFill} from "react-icons/bs";


function UserProfile() {
    const deslpayName = ""
    const profilePicUrl = ""

  return (
    <>
       <div className="profilePictureBox">
        {profilePicUrl !== "" ? 
        <img src={profilePicUrl} className="profilePicture" alt="User Profile Pic" width="200px" height="200px" />
        : <div className="profilePictureFillIn">{deslpayName[0]}</div>
        }
        <h4>{deslpayName}</h4>
        <StarRatingBar numberOfStars={3.5}/>
      </div>
    </>
  );
}

export default UserProfile;
