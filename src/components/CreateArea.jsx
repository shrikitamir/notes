import React, { useState } from "react";

function CreateArea(props) {
  const [note, setNote] = useState({ title: "", content: "", date: "" });

  function handleChange(e) {
    const { value, name } = e.target;
    setNote((prev) => {
      return { ...prev, [name]: value };
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!note.content) return;
    const date = new Date().toString().substring(0, 24);
    props.addNote({ ...note, date });
    setNote({ title: "", content: "", date: "" });
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          autoComplete="off"
          name="title"
          placeholder="Note title"
          value={note.title}
          onChange={handleChange}
        ></input>
        <textarea
          autoComplete="off"
          onChange={handleChange}
          name="content"
          value={note.content}
          placeholder="Take a note..."
          rows="4"
        />
        <button>➕</button>
      </form>
    </div>
  );
}

export default CreateArea;
