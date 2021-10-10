// CSS
import NewNoteIcon from "../NewNoteIcon/NewNoteIcon";
import "./widget.css";


interface StarProps {
  type: string,
  numberOf: number,
  icon: object,
  numOfNotes: number
}

const Widget: React.FC<StarProps> = ({type, numberOf, icon, numOfNotes}) => {  

  return ( 
        <div className="widget">
            <div className="iconRing">
            <NewNoteIcon numberOfNotes={numOfNotes}/>
            {icon}
            </div>
           {numberOf}
           <h5>{type}</h5>
        </div>
  );
}

export default Widget;
