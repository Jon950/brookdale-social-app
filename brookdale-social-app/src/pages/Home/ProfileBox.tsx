// React
import {
  Link
} from "react-router-dom";

// components
import StarRatingBar from '../../components/StarRatingBar/StarRatingBar';


interface ProfileProps {
  deslpayName:string,
  photoURL: string,
  numberOfStars: number,
 
}

const ProfileBox: React.FC<ProfileProps> = ({deslpayName, photoURL, numberOfStars}) => {

  return (
    <>
      <div className="profilePictureBox">
        <Link to="/userprofile" className="linkBtn">
        {photoURL !== "" ? 
        <img src={photoURL} className="profilePicture" alt="User Profile Pic" width="200px" height="200px" />
        : <div className="profilePictureFillIn">{deslpayName[0]}</div>
        }
        </Link>
        <h4>{deslpayName}</h4>
        <StarRatingBar size="20px" numberOfStars={numberOfStars}/>
      </div>
    </>
  );
}

export default ProfileBox;
