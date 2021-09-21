// React

// Icons

// components
import SearchBox from "../subComponents/SearchBox"
  
  
  interface TableProps {
    tableName:string,
    list: Array<object>,
  }
  
  const Table: React.FC<TableProps> = ({tableName, list}) => {
    

    console.log("table ", tableName, list)

    const testRun = (event: any) => {
        event.preventDefault()
        console.log("testRun", event)
    }

    return (
      <>
      <div className="tableHeader">
          <h2>{tableName}</h2>
      </div>
        <div className="tableBox">
        <SearchBox searchSubmit={testRun}/>
        <div className="table">
            {list.length > 0 ? <div></div> : <div className="emptyTableMessageBox"><p>There are no {tableName} available.</p></div>}
        </div>
        </div>
      </>
    );
  }
  
  export default Table;
  