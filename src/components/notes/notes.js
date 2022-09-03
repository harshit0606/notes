import React, { useEffect, useState , useMemo } from "react";

import Pagination from "../pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Modal } from "react-bootstrap";
import { BsPin } from "react-icons/bs";
import SingleNote from "./singleNote";
import "./notes.css";

function Notes() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [tagline, setTagline] = useState("");
  const [text, setText] = useState("");
  const [update,setUpdate]=useState(false);
  const [modalShow,setModalShow]=useState(false);
  const [ispinned, setisPinned] = useState(false);
  const [loading,setLoading]=useState(true);
  let view=useSelector((state)=>state.notes);
let theme=useSelector((state)=>state.theme);
let PageSize = 6;
const [currentPage, setCurrentPage] = useState(1);

const currentTableData = useMemo(() => {
  const firstPageIndex = (currentPage - 1) * PageSize;
  const lastPageIndex = firstPageIndex + PageSize;
  return notes.slice(firstPageIndex, lastPageIndex);
}, [currentPage,loading]);

function handleModalClose() {
  console.log("closing");
  setModalShow(false);
}

function handleOpen() {
  setModalShow(true);
}


  useEffect(() => {
    setNotes([]);
    axios
      .get("http://localhost:5000/api/getnotes")
      .then((res) => {
        setNotes(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
    

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
  }, [update]);

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
      
      <div className={view?"all_notes":"all_notes full"}>
        {currentTableData.map((note) => (
          <SingleNote update={update} setUpdate={setUpdate} openModal={handleOpen} close={handleModalClose} note={note} />
        ))}
      </div>
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={notes.length}
        pageSize={PageSize}
        onPageChange={page => setCurrentPage(page)}
      />
    </div>
  );
}

export default Notes;
