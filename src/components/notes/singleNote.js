import React, { useEffect, useState } from "react";
import "./singleNote.css";
import { BsPin } from "react-icons/bs";
import axios from "axios";
import { useSelector } from "react-redux";
import { IoTrashOutline } from "react-icons/io5";
import { Modal } from "react-bootstrap";
import { FaCloudShowersHeavy } from "react-icons/fa";
 
  
   
  

function SingleNote({ note ,openModal, close,update,setUpdate}) {
  const [title, setTitle] = useState("");
  const [tagline, setTagline] = useState("");
  const [text, setText] = useState("");
  const [ispinned, setisPinned] = useState(false);
  const [modalShow,setModalShow]=useState(false);
  let view = useSelector((state) => state.notes);
  let theme = useSelector((state) => state.theme);

  function handleDelete() {
    axios
      .delete(`http://localhost:5000/api/deletenote/${note._id}`)
      .then(() => {
        console.log("Note deleted");
        if(update==true){
          setUpdate(false);
        }else{
          setUpdate(true);
        }
      });
  }

 
  function handleModalClose() {
    console.log("closing");
    setModalShow(false);
  }
  
  function handleOpen(note) {
    setModalShow(true);
    setTitle(note.Title);
    setTagline(note.Tagline);
    setText(note.Text);
  }
  

  function handleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    if (name === "title") {
      setTitle(value);
    }
    if (name === "tagline") {
      setTagline(value);
    }
    if (name === "text") {
      setText(value);
    }
  }
  function handlePin(note) {
    if(note.isPinned===true){
      axios
      .patch(`http://localhost:5000/api/editnote/${note._id}`, {
        isPinned: false,
      }).then(()=>{
        note.isPinned=false;
      })
    }else{
      axios
      .patch(`http://localhost:5000/api/editnote/${note._id}`, {
        isPinned: true,
      }).then(()=>{
        note.isPinned=true;
      })
    }
    
  }

  function handleAdd(note) {
    axios
      .patch(`http://localhost:5000/api/editnote/${note._id}`, {
        Title: title,
        Tagline: tagline,
        Text: text,
        isPinned: ispinned,
      })
      .then((res) => {
        setTagline("");
        setText("");
        setTitle("");
        handleModalClose();
      });
  }

  return (
    <div>
    <Modal
      show={modalShow}
      onHide={() => {
        setModalShow(false);
      }}
    >
      
      <Modal.Body>
        <div style={{ width: "480px" }}>
        <div className="edit_note">
        <BsPin onClick={handlePin} className="pin_icon" />
        <input
          className={theme?"add_input":'add_input_dark'}
          type="text"
          name="title"
          onChange={(e) => {
            handleChange(e);
          }}
          placeholder="Take a note..."
          value={title}
        />
        <div className="edit_inputs">
          <input
            className="add_input1"
            type="text"
            name="tagline"
            onChange={(e) => {
              handleChange(e);
            }}
            placeholder="Enter a Tagline"
            value={tagline}
          />
          <input
            className="add_input2"
            type="textarea"
            name="text"
            onChange={(e) => {
              handleChange(e);
            }}
            placeholder="Enter Note"
            value={text}
          />
          <div className="note_buttons">
            <button onClick={()=>handleAdd(note)} className="add_btn">
              Edit
            </button>
            <button onClick={handleModalClose} className="close_btn">
              Close
            </button>
          </div>
        </div>
      </div>
      </div>
      </Modal.Body>
    </Modal>
    <div
     
      className={
        view
          ? `singlenote ${theme ? "" : `dark`}`
          : `singlenote full ${theme ? `` : `dark`}`
      }
    >

      <BsPin onClick={()=>handlePin(note)} className={note.isPinned?"pinned_icon":"pin_iconn"} />
      <div className="dots">
        <div onClick={handleDelete}>
          <IoTrashOutline />
        </div>
      </div>
      <h1>{note.Title}</h1>
      <h3>{note.Tagline}</h3>
      <div>
        <p>{note.Text}</p>
      </div>
    </div>
    </div>
  );
}

export default SingleNote;
