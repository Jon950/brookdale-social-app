// React
import { useState } from 'react';
// import FlipMove from "react-flip-move";

// Firebase
import { db } from "../../firebaseConfigDoc";
import { collection, query, limit, orderBy, where, getDocs, updateDoc, doc, increment } from "firebase/firestore";

// Redux
// import { useSelector } from "react-redux";

// components
import StarRatingBar from '../subComponents/StarRatingBar';
import SearchBox from "../subComponents/SearchBox"
  
  
  interface TableProps {
    tableName:string,
    collectionName: string
    list: any,
    setList: any,
    test: any
    userData: any
  }
  
  const Table: React.FC<TableProps> = ({tableName, collectionName, list, setList, test, userData}) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [OpenRow, setOpenRow] = useState("");
    const [ratings, setRatings] = useState<any>({value: null});


    const openRowStyle = {borderRadius: "10px 10px 0 0"};
    const testRun = (event: any, inputID: string) => {
        event.preventDefault();

        console.log("testRun", searchTerm)
    }

  const findNewList = () => {
    console.log("findNewList",collectionName, searchTerm);
    if(searchTerm.length >= 3) {
      const newList: Array<object> = [];
      console.log("#");

      const q = query(collection(db, collectionName), limit(10), orderBy("displayName"),
      where("userNameArray", "array-contains", searchTerm.toLowerCase()), 
      where("displayName", "!=", userData.displayName));

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

  const addToList = () => {
    console.log("addtolist")
  }



  const saveRatings = () => {
    if(OpenRow){

      if(userData.starRatingHistory.findIndex((object: any, index:number) => {
        return object.uid === ratings.uid;
      }) === -1) {
        userData.starRatingHistory.push({uid: ratings.uid, value: ratings.value});

        
        console.log("SKHFKJH",ratings)
  
        updateDoc(doc(db, "users", ratings.uid), {
          numberOfRatings: increment(1),
          socialScore: increment(ratings.value)
        });
        

      } else {
        let oldData = userData.starRatingHistory[userData.starRatingHistory.findIndex((object: any, index:number) => {
          return object.uid === ratings.uid;
        })].value;
        console.log("oldData",oldData) 

        userData.starRatingHistory[userData.starRatingHistory.findIndex((object: any, index:number) => {
          return object.uid === ratings.uid;
        })].value = ratings.value;

        console.log("SKHFKJH", ratings.value - oldData)
        // const sfDocRef = doc(db, "users", userData.uid);
        // try {
        //   runTransaction(db, async (transaction) => {
        //     const sfDoc = await transaction.get(sfDocRef);
        //     if (!sfDoc.exists()) {
        //       throw console.log("Document does not exist!");
        //     }
        
        //     const newPopulation = sfDoc.data().starRatingHistory;
        //     transaction.update(sfDocRef, { population: newPopulation });
        //   });
        //   console.log("Transaction successfully committed!");
        // } catch (e) {
        //   console.log("Transaction failed: ", e);
        // }
  
        // updateDoc(doc(db, "users", ratings.uid), {
        //   socialScore: increment(ratings.value)
        // });
        
      }

      updateDoc(doc(db, "users", userData.uid), {
        starRatingHistory: userData.starRatingHistory
      });
    }
  }

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

              <div key={row.uid} >
                <div className="tableRow" style={OpenRow === row.uid ? openRowStyle : {}} 
                onClick={() => {setOpenRow(OpenRow === row.uid ? "" : row.uid); saveRatings()}}>
                  <span>{row.profilePicUrl === "" ? <div className="tableRowImage">{row.displayName[0]}</div> : 
                  <img width="40" height="40" src={row.profilePicUrl} alt="Thumbnail" className="thumbnail" />}</span>
                  <span>{row.displayName}</span>
                  <span className="stars"><StarRatingBar size="15px" numberOfStars={(row.socialScore / row.numberOfRatings)}/></span>
                </div>
                {OpenRow === row.uid ? 
                  <div className="tableRowDropDown">
                    <button className="smallBtn" onClick={addToList}>Add as {tableName.slice(0, tableName.length -1 )}</button>
                    <span>Rate:</span> 
                    <span className="starSetter">
                      <StarRatingBar size="15px" numberOfStars={ratings.value !== null ? ratings.value : userData.starRatingHistory
                      [userData.starRatingHistory.findIndex((object: any, index:number) => {return object.uid === row.uid;
                      })].value}/>
                      <input className="slider" type="range" min="1" max="5" step=".5"  
                      onChange={(event:any) => setRatings({uid: row.uid, value: event.target.value})} />
                      </span>
                  </div>
                  : ""
                }
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
  