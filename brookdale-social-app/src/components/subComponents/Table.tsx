// React
import { useState } from 'react';
// import FlipMove from "react-flip-move";

// Firebase
import { db } from "../../firebaseConfigDoc";
import { collection, query, limit, where, getDocs } from "firebase/firestore";

// components
import StarRatingBar from '../subComponents/StarRatingBar';
import SearchBox from "../subComponents/SearchBox"
  
  
  interface TableProps {
    tableName:string,
    collectionName: string
    list: Array<object>,
    setList: any,
    test: any
  }
  
  const Table: React.FC<TableProps> = ({tableName, collectionName, list, setList, test}) => {
    const [searchTerm, setSearchTerm] = useState("")

    const testRun = (event: any, inputID: string) => {
        event.preventDefault();

        console.log("testRun", searchTerm)
    }

  const findNewList = () => {
    console.log("findNewList",collectionName, searchTerm);
    if(searchTerm.length >= 3) {
      const newList: Array<object> = [];
      console.log("#");

      const q = query(collection(db, collectionName), limit(10), 
      where("userNameArray", "array-contains", searchTerm.toLowerCase()));

      getDocs(q).then(querySnapshot => {
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          data.uid = doc.id;
          // doc.data() is never undefined for query doc snapshots
          console.log("data", data);
          newList.push(data);
        });
        setList(newList);
      });
    }
  }

  console.log("list", list)
    return (
      <>
      <div className="tableHeader">
          <h2>{tableName}</h2>
          {/* <button onClick={test}>test</button> */}
      </div>
        <div className="tableBox">
        <SearchBox searchSubmit={testRun} setValue={setSearchTerm}/>
        <button className="findNewBtn" onClick={findNewList}>Find New {tableName}</button>
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
                <span className="stars"><StarRatingBar size="15px" numberOfStars={row.starRating}/></span>
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
  