// CSS
import "./searchBox.css";
  
  
  interface SearchBoxProps {
      searchSubmit: any;
      setValue: any;
  }
  
  const SearchBox: React.FC<SearchBoxProps> = ({searchSubmit, setValue}) => {

    return (
        <form className="searchFormBox">
        <input type="text" className="searchInput" placeholder="Search..." name="search" onChange={event => {setValue(event.target.value)}}/>
        {/* <button type="submit" onClick={searchSubmit}><FaSearch size="25px"/></button> */}
      </form>
    );
  }
  
  export default SearchBox;
  