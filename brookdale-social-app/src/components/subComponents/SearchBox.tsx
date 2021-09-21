// React

// Icons
import {FaSearch} from "react-icons/fa"

// components
  
  
  
  interface SearchBoxProps {
      searchSubmit: any;
  }
  
  const SearchBox: React.FC<SearchBoxProps> = ({searchSubmit}) => {

  
  
  
  
  
    
   
    return (
        <form className="searchFormBox">
        <input type="text" className="searchInput" placeholder="Search..." name="search"/>
        <button type="submit" onClick={searchSubmit}><FaSearch size="25px"/></button>
      </form>
    );
  }
  
  export default SearchBox;
  