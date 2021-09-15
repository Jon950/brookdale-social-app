// React
// import React, {useEffect, useState} from 'react';


interface StarProps {
  type: string,
  numberOf: number,
  icon: object
}

const Widget: React.FC<StarProps> = ({type, numberOf, icon}) => {

  
     

  return ( 
        <div className="widget">
            <div className="FriendsRing">
            {icon}
            </div>
           {numberOf}
           <h5>{type}</h5>
        </div>
  );
}

export default Widget;
