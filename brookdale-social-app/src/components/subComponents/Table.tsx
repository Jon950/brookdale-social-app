// React
import { useState } from 'react';
import {Link} from "react-router-dom"
// import FlipMove from "react-flip-move";

// Firebase
import { db } from "../../firebaseConfigDoc";
import { collection, query, limit, orderBy, where, getDocs, updateDoc, doc, increment, runTransaction } from "firebase/firestore";

// Redux
// import { useSelector } from "react-redux";

// components
import StarRatingBar from '../subComponents/StarRatingBar';
import SearchBox from "../subComponents/SearchBox"
  
  
  interface TableProps {
    tableName:string,
    collectionName: string
    list: any,
    listOut: Array<object>,
    listName: string,
    setListOut: any,
    test: any
    userData: any
  }
  
  const Table: React.FC<TableProps> = ({tableName, collectionName, list, listOut, listName, setListOut, test, userData}) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [OpenRow, setOpenRow] = useState("");
    const [ratings, setRatings] = useState<any>({value: null});
    

    const requestList: Array<any> = list.filter((value: any) => {
      if(value.status === "request"){
        return value;
      }
      return null;
    });


    const friendsList = list.filter((value: any) => {
      if(value.status === "friend"){
        return value;
      }
      return null;
    });
    


    const openRowStyle = {borderRadius: "10px 10px 0 0"};
    const testRun = (event: any, inputID: string) => {
        event.preventDefault();

    }

  // ------------------------------------------------------------ find New List
  const findNewList = () => {
    if(searchTerm.length >= 3) {
      const newList: Array<object> = [];

      const q = query(collection(db, collectionName), limit(10), orderBy("displayName"),
      where("userNameArray", "array-contains", searchTerm.toLowerCase()), 
      where("displayName", "!=", userData.displayName));

      getDocs(q).then(querySnapshot => {
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          data.uid = doc.id;
          // doc.data() is never undefined for query doc snapshots
          newList.push(data);
        });
        setListOut(newList);
      });
    }
  }


  // ------------------------------------------------------------ remove From List
  const removeFromList = (row: any) => {
    console.log("removeFromList", row)

    const sfDocRef = doc(db, "users", userData.uid);
    try {
      runTransaction(db, async (transaction) => {
        const sfDoc = await transaction.get(sfDocRef);
        if (!sfDoc.exists()) {
          throw console.log("Document does not exist!");
        }

        const newPopulation = sfDoc.data()[listName];
        
        newPopulation.splice(newPopulation.findIndex((object: any, index:number) => {
            return object.uid === row.uid;
          }), 1 );
        

        transaction.update(sfDocRef, { [listName]: newPopulation });
      });
      console.log("Transaction successfully committed!");
    } catch (e) {
      console.log("Transaction failed: ", e);
    }


    // other user -------------------------------------------------------------
    const sfDocRef2 = doc(db, "users", row.uid);
    try {
      runTransaction(db, async (transaction) => {
        const sfDoc = await transaction.get(sfDocRef2);
        if (!sfDoc.exists()) {
          throw console.log("Document does not exist!");
        }

        const newPopulation = sfDoc.data()[listName];
        
        newPopulation.splice(newPopulation.findIndex((object: any, index:number) => {
            return object.uid === userData.uid;
          }), 1 );
        

        transaction.update(sfDocRef2, { [listName]: newPopulation });
      });
      console.log("Transaction successfully committed!");
    } catch (e) {
      console.log("Transaction failed: ", e);
    }
  }

 





  const saveRatings = () => {
    
    if(OpenRow !== "" && ratings.uid){

      if(userData.starRatingHistory.findIndex((object: any, index:number) => {
        return object.uid === ratings.uid;
      }) === -1) {
        userData.starRatingHistory.push({uid: ratings.uid, value: ratings.value});

  
        updateDoc(doc(db, "users", ratings.uid), {
          numberOfRatings: increment(1),
          socialScore: increment(ratings.value)
        });
        

      } else {
        let oldData = userData.starRatingHistory[userData.starRatingHistory.findIndex((object: any, index:number) => {
          return object.uid === ratings.uid;
        })].value;

        userData.starRatingHistory[userData.starRatingHistory.findIndex((object: any, index:number) => {
          return object.uid === ratings.uid;
        })].value = ratings.value;

        updateDoc(doc(db, "users", ratings.uid), {
          socialScore: increment(ratings.value - oldData)
        });
        
      }

      updateDoc(doc(db, "users", userData.uid), {
        starRatingHistory: userData.starRatingHistory
      });
    }
  }


  // ----------------------------------------------------------------------------- set To List
  const setToList = (row: any, operationType: string = "") => {

    if(operationType !== "") {
      // added to other user
      const otherUserDocRef = doc(db, "users", row.uid);
      try {
        runTransaction(db, async (transaction) => {
          const sfDoc = await transaction.get(otherUserDocRef);
          if (!sfDoc.exists()) {
            throw console.log("Document does not exist!");
          }

          const newPopulation = sfDoc.data()[listName];

          if(operationType === "request") {
            if(newPopulation.findIndex((object: any, index:number) => {
              return object.uid === userData.uid;
            }) === - 1) {
              newPopulation.push({
                displayName: userData.displayName,
                photoURL: userData.photoURL,
                favoriteColor: userData.favoriteColor,
                uid: userData.uid,
                status: operationType
              });
            }
          } else if(operationType === "exceptRequest") {
            newPopulation.splice(newPopulation.findIndex((object: any, index:number) => {
              return object.uid === userData.uid;
            }), 1 );
            newPopulation.push({
              displayName: userData.displayName,
              photoURL: userData.photoURL,
              favoriteColor: userData.favoriteColor,
              uid: userData.uid,
              status: "friend"
            });
          }

          transaction.update(otherUserDocRef, { [listName]: newPopulation });
          console.log("DDFSDF", newPopulation)
        });
        console.log("Transaction successfully committed!");
      } catch (e) {
        console.log("Transaction failed: ", e);
      }


      // added to other this user
      const thisUserDocRef = doc(db, "users", userData.uid);
      try {
        runTransaction(db, async (transaction) => {
          const sfDoc = await transaction.get(thisUserDocRef);
          if (!sfDoc.exists()) {
            throw console.log("Document does not exist!");
          }

          const newPopulation = sfDoc.data()[listName];

          if(operationType === "request") {
            if(newPopulation.findIndex((object: any, index:number) => {
              return object.uid === row.uid;
            }) === - 1) {
              newPopulation.push({
                displayName: row.displayName,
                photoURL: row.photoURL,
                favoriteColor: row.favoriteColor,
                uid: row.uid,
                status: "myRequest"
              });
            }
          } else if(operationType === "exceptRequest") {
            newPopulation.splice(newPopulation.findIndex((object: any, index:number) => {
              return object.uid === row.uid;
            }), 1 );
            newPopulation.push({
              displayName: row.displayName,
              photoURL: row.photoURL,
              favoriteColor: row.favoriteColor,
              uid: row.uid,
              status: "friend"
            });
          }

          transaction.update(thisUserDocRef, { [listName]: newPopulation });
          console.log("DDFSDF", newPopulation)
        });
        console.log("Transaction successfully committed!");
      } catch (e) {
        console.log("Transaction failed: ", e);
      }
    }
  }

  const getMyGroup = () => {

      const newList: Array<object> = [];

      const q = query(collection(db, collectionName), limit(10), orderBy("displayName"), 
      where("author_uid", "==", userData.uid));

      getDocs(q).then(querySnapshot => {
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          data.uid = doc.id;
          // doc.data() is never undefined for query doc snapshots
          newList.push(data);
        });
        setListOut(newList);
      });
  }


    return (
      <>
      <div className="tableHeader">
          <h2>{tableName}{requestList.length > 0 ? 
            <span onClick={() => setListOut(requestList)} className="newUserIcon">{requestList.length}</span> : ""}</h2>
          {/* <button onClick={test}>test</button> */}
      </div>
        <div className="tableBox">
        <SearchBox searchSubmit={testRun} setValue={setSearchTerm}/>
        <button className="tableBtn tableBtnL" onClick={findNewList}>Find New {tableName}</button>
        <button className="tableBtn tableBtnR" onClick={() => setListOut(friendsList)}>{tableName} List</button>
        {tableName === "Groups" ? 
        <>
        <button className="tableBtn tableBtnL" onClick={getMyGroup}>My Group</button>

        <Link to="/creategroup">
        <button className="tableBtn tableBtnR">Create Group</button>
        </Link>
        </>
        : "" }
        <div className="table">
          {/* <FlipMove> */}
            {listOut.length > 0 ? <div className="scrollBox">
              {listOut.filter((value: any) => {
                if(searchTerm === "") {
                  return value;
                } else if(value.displayName.toLowerCase().includes(searchTerm.toLocaleLowerCase())){
                  return value;
                }
                return null;
              }).map((row: any) => 

              <div key={row.uid} >
                <div className="tableRow" style={OpenRow === row.uid ? openRowStyle : {}} 
                onClick={() => {setOpenRow(OpenRow === row.uid ? "" : row.uid); saveRatings()}}>
                  <span>{row.photoURL === "" ? <div className="tableRowImage">{row.displayName[0]}</div> : 
                  <img width="40" height="40" src={row.photoURL} alt="Thumbnail" className="thumbnail" />}</span>
                  <span>{row.displayName}</span>
                  <span className="stars"><StarRatingBar size="15px" numberOfStars={
                    (row.socialScore / (row.numberOfRatings > 0 ? row.numberOfRatings : 1))}/></span>
                </div>
                {OpenRow === row.uid ? 
                  <div className="tableRowDropDown">
                    {
                    // is in friends list?
                    userData[listName].findIndex((object: any, index:number) => {
                      return object.uid === row.uid && object.status === "friend";
                    }) === -1 ? 

                    // is in friends request list?
                    userData[listName].findIndex((object: any, index:number) => {
                      return object.uid === row.uid && object.status === "myRequest";
                    }) === -1 ?

                    // is in this friends request list?
                    userData[listName].findIndex((object: any, index:number) => {
                      return object.uid === row.uid && object.status === "request";
                    }) === -1 ? 
                        <button className="smallBtn" onClick={() => setToList(row, "request")}>
                          Request {tableName.slice(0, tableName.length -1 )}</button>
                      :
                        <button className="smallBtn" onClick={() => setToList(row, "exceptRequest")}>
                          Except Request</button>
                      : 
                        <button className="smallBtn" onClick={() => removeFromList(row)}>
                          Unrequest</button>
                      : 
                        <button className="smallBtn" onClick={() => removeFromList(row)}>
                          Un{tableName.slice(0, tableName.length -1 ).toLocaleLowerCase()}</button>
                        
                    }

                    <span>Rate:</span> 
                    <span className="starSetter">
                      
                      <StarRatingBar size="15px" numberOfStars={
                        ratings.value ? ratings.value 
                        : userData.starRatingHistory.length > 0 ? 
                            userData.starRatingHistory.findIndex((object: any, index:number) => 
                              {return object.uid === row.uid; }) === -1 ? 
                              (userData.socialScore / (userData.numberOfRatings === 0 ? 1 : userData.numberOfRatings))
                                : userData.starRatingHistory[userData.starRatingHistory.findIndex((object: any, index:number) => 
                                  {return object.uid === row.uid; })].value 
                          : (userData.socialScore / (userData.numberOfRatings === 0 ? 1 : userData.numberOfRatings))}/>
                      
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
  