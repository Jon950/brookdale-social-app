// React


// components

  
  
  interface TableProps {
    tableName:string,
    list: Array<object>,
  }
  
  const Table: React.FC<TableProps> = ({tableName, list}) => {
    

    console.log("table ", tableName, list)

    return (
      <>
        <div className="profilePictureBox">
          
        </div>
      </>
    );
  }
  
  export default Table;
  