import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Note from "./components/Note";
import CreateArea from "./components/CreateArea";
import * as localForage from "localforage";

function App() {
  const [noteArr, setNoteArr] = useState([]);

  useEffect(() => {
    localForage.getItem("notes").then((data) => {
      if (data === null) return;
      setNoteArr(data);
    });
  }, []);

  useEffect(() => {
    localForage.setItem("notes", noteArr);
  }, [noteArr]);

  function addNote(noteObj) {
    setNoteArr((prev) => {
      return [...prev, noteObj];
    });
  }

  function editNote(editNote, id, date) {
    setNoteArr((prev) => {
      const edited = prev.filter((e, index) => {
        return index !== id;
      });
      return [...edited, { ...editNote, newDate: date }];
    });
  }

  function deleteNote(id) {
    const msg = window.confirm("Are you sure you want to delete this note?");
    if (msg) {
      setNoteArr((prev) => {
        return prev.filter((e, index) => {
          return index !== id;
        });
      });
    }
    return;
  }

  return (
    <div>
      <Header />
      <CreateArea addNote={addNote} />
      {noteArr.map((note, index) => (
        <Note
          header={note.title}
          content={note.content}
          date={note.date}
          newDate={note.newDate}
          key={index}
          deleteNote={deleteNote}
          editNote={editNote}
          id={index}
        />
      ))}
      <Footer />
    </div>
  );
}

export default App;
