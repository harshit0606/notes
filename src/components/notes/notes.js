import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNote, getNotes, fetchNotes } from "../../redux/actions/notes";
import axios from "axios";
import { BsPin } from "react-icons/bs";
import SingleNote from "./singleNote";
import "./notes.css";

function Notes() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [tagline, setTagline] = useState("");
  const [text, setText] = useState("");
  const [ispinned, setisPinned] = useState(false);

let theme=useSelector((state)=>state.theme);
  useEffect(() => {
    setNotes([]);
    axios
      .get("http://localhost:5000/api/getnotes")
      .then((res) => {
        setNotes(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    fetchNotes()

    let inputs = document.querySelector(".add_inputs");
    let input1 = document.querySelector(".add_input");
    let pin = document.querySelector(".pin_icon");

    if (input1 && inputs) {
      input1.addEventListener("click", () => {
        input1.placeholder = "Enter Title";
        inputs.classList.add("visible");
        if (pin) {
          pin.classList.add("visible");
        }
      });
    }
  }, []);

  function handleClose() {
    let inputs = document.querySelector(".add_inputs");
    let input1 = document.querySelector(".add_input");
    if(!theme){
      input1=document.querySelector(".add_input_dark");
    }
    let pin = document.querySelector(".pin_icon");
    if (inputs && pin && input1) {
      input1.placeholder = "Take a note...";
      inputs.classList.remove("visible");
      pin.classList.remove("visible");
    }
    setTagline("");
        setText("");
        setTitle("");
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
  function handlePin() {}

  function handleAdd() {
    axios
      .post("http://localhost:5000/api/addnote", {
        Title: title,
        Tagline: tagline,
        Text: text,
        isPinned: ispinned,
      })
      .then((res) => {
        setNotes((e) => [...e, res.data]);
        setTagline("");
        setText("");
        setTitle("");
        handleClose();
      });
  }

  return (
    <div className={theme?"allNotes":"allNotes_dark"}>
      <div className="add_note">
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
        <div className="add_inputs">
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
            <button onClick={handleAdd} className="add_btn">
              Add
            </button>
            <button onClick={handleClose} className="close_btn">
              Close
            </button>
          </div>
        </div>
      </div>
      <div className="all_notes">
        {notes.map((note) => (
          <SingleNote note={note} />
        ))}
      </div>
    </div>
  );
}

export default Notes;
