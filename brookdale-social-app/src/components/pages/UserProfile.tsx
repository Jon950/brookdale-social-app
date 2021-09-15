// React
import {Link} from "react-router-dom"
// components
import StarRatingBar from '../subComponents/StarRatingBar';

// Icons
import {AiFillHome} from "react-icons/ai";
import {GoSignOut} from "react-icons/go";


function UserProfile() {
    const deslpayName = "John Smith"
    const profilePicUrl = ""
    const email = "johnsmith@gmail.com"
    const userColor = "rgb(154, 140, 201)"

    

  return (
  
       <div className="UserProfile">
         <Link to="/">
         <div className="cornerBtn homeBtn"><AiFillHome size="20px" title="signOut" className="icon"/></div>
         </Link>
         <div className="cornerBtn signOutBtn"><GoSignOut size="20px" title="signOut" className="icon"/></div>

        {profilePicUrl !== "" ? 
        <img src={profilePicUrl} className="profilePicture" alt="User Profile Pic" width="200px" height="200px" />
        : <div className="profilePictureFillIn">{deslpayName[0]}</div>
        }
        <h4>{deslpayName}</h4>
        <StarRatingBar numberOfStars={3.5}/>
        <h5>{email}</h5>
        <div className="colorBar" style={{backgroundColor: userColor}}>Your favorite color</div>
      </div>

  );
}

export default UserProfile;
