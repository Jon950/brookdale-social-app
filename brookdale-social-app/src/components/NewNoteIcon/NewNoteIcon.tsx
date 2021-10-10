interface noteProps {
  numberOfNotes: number
}

const NewNoteIcon: React.FC<noteProps> = ({numberOfNotes = 0}) => {  
  return <div className="newNote">{numberOfNotes >= 999 ? 999 + "+" : numberOfNotes <= 0 ? "" : numberOfNotes}</div>;
}

export default NewNoteIcon;
