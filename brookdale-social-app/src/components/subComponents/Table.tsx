// React
import { useState } from 'react';
// import FlipMove from "react-flip-move";

// components
import StarRatingBar from '../subComponents/StarRatingBar';
import SearchBox from "../subComponents/SearchBox"
  
  
  interface TableProps {
    tableName:string,
    list: Array<object>,
    test: any
  }
  
  const Table: React.FC<TableProps> = ({tableName, list, test}) => {
    const [searchTerm, setSearchTerm] = useState("")

    const testRun = (event: any, inputID: string) => {
        event.preventDefault()

        console.log("testRun", searchTerm)
    }

    return (
      <>
      <div className="tableHeader">
          <h2>{tableName}</h2>
          {/* <button onClick={test}>test</button> */}
      </div>
        <div className="tableBox">
        <SearchBox searchSubmit={testRun} setValue={setSearchTerm}/>
        <div className="table">
          {/* <FlipMove> */}
            {list.length > 0 ? <div className="scrollBox">
              {list.filter((value: any) => {
                if(searchTerm === "") {
                  return value;
                } else if(value.displayName.toLowerCase().includes(searchTerm.toLocaleLowerCase()) ){
                  return value;
                }
                return null;
              }).map((row: any) => 
              <div key={row.uid} className="tableRow">
                <span>{row.profilePicUrl === "" ? <div className="tableRowImage">{row.displayName[0]}</div> : 
                <img width="40" height="40" src={row.profilePicUrl} alt="Thumbnail" className="thumbnail" />}</span>
                <span>{row.displayName}</span>
                <span className="stars"><StarRatingBar numberOfStars={row.starRating}/></span>
              </div>)}
            </div> : 
            <div className="emptyTableMessageBox"><p>There are no {tableName} available.</p></div>}
            {/* </FlipMove> */}
            
        </div>
        </div>
      </>
    );
  }
  
  export default Table;
  