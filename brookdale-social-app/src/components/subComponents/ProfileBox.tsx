// components
import StarRatingBar from './StarRatingBar';

// Icons
// import {BsStarFill} from "react-icons/bs";

interface ProfileProps {
  deslpayName:string,
  profilePicUrl: string,
  numberOfStars: number,
 
}

const ProfileBox: React.FC<ProfileProps> = ({deslpayName, profilePicUrl, numberOfStars}) => {
  // const [userData, setUserData] = useState({profilePicUrl: "", deslpayName: "John Smith"})
  // const [numberOfStars, setnumberOfStars] = useState( 0);





  
 
  return (
    <>
      <div className="profilePictureBox">
        {profilePicUrl !== "" ? 
        <img src={profilePicUrl} className="profilePicture" alt="User Profile Pic" width="200px" height="200px" />
        : <div className="profilePictureFillIn">{deslpayName[0]}</div>
        }
        <h4>{deslpayName}</h4>
        <StarRatingBar numberOfStars={numberOfStars}/>
      </div>
    </>
  );
}

export default ProfileBox;
