import React from "react";
import "./singleNote.css";
import { BsPin, BsThreeDotsVertical } from "react-icons/bs";

function SingleNote({ note }) {
  return (
    <div className="singlenote">
      <BsPin className="pin_iconn" />
      <BsThreeDotsVertical className="dots" />
      <h1>{note.Title}</h1>
      <h3>{note.Tagline}</h3>
      <div>
        <p>{note.Text}</p>
      </div>
    </div>
  );
}

export default SingleNote;
