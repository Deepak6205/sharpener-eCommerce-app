import React, { useState } from "react";
import "../../styles/MovieForm.css";

const MovieForm = ({ onAddMovie }) => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [date, setDate] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    const movie = {
      title: title,
      opening_crawl: text,
      release_date: date,
    };
    onAddMovie(movie);
    setTitle("");
    setText("");
    setDate("");
  };

  return (
    <form onSubmit={submitHandler} className="form-container">
      <div>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="open-text">Opening Text</label>
        <textarea
          cols={43}
          rows={5}
          id="open-text"
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
      </div>
      <div>
        <label htmlFor="r-date">Release Date</label>
        <input
          type="date"
          id="r-date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />
      </div>
      <button className="add-btn">Add Movie</button>
    </form>
  );
};

export default MovieForm;
