// React
import { Link } from "react-router-dom";
  
// Icons
import { AiFillHome } from 'react-icons/ai';
import { RiArrowGoBackFill } from 'react-icons/ri';
  
interface FooterProps {
    lastPage: any,   
  }
  
  const FooterNav: React.FC<FooterProps> = ({lastPage = ""}) => {
  
    return (
      <nav className="footerNav">
          {lastPage !== "" ?
        <Link to={lastPage}>
          <div className="btn"><RiArrowGoBackFill  title="User Profile" className="icon"/></div>
        </Link>
        : ""}

        <Link to="/">
          <div className="btn"><AiFillHome  title="User Profile" className="icon"/></div>
        </Link>
      </nav>
    );
  }
  
  export default FooterNav;
  