import React, { useState } from "react";
import "../../styles/MovieForm.css";
const MovieForm = () => {
    const [title,setTitle] = useState("");
    const [text,setText] = useState("");
    const [date,setDate] = useState("");
    
    const titleChangeHandler = (e) =>{
        setTitle(e.target.value);
    }

    const textChangeHandler = (e) =>{
        setText(e.target.value);
    }

    const dateChangeHandler = (e) =>{
        setDate(e.target.value);
    }
 const submitHandler = (e)=>{
    e.preventDefault();
    console.log([title,text,date]);
    setTitle("");
    setText("");
    setDate("");
 }
  return (
    <form onSubmit={submitHandler} className="form-container">
      <div>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" value={title}  onChange={titleChangeHandler}/>
      </div>
      <div>
        <label htmlFor="open-text">Opening Text</label>
        <textarea cols={43} rows={5} type="text" id="open-text" onChange={textChangeHandler} value={text} />
      </div>
      <div>
        <label htmlFor="r-date" >Title</label>
        <input type="date" id="r-date" onChange={dateChangeHandler} value={date}/>
      </div>
      <button className="add-btn">Add Movie</button>
    </form>
  );
};

export default MovieForm;
