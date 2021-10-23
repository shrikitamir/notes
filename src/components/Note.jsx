import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function Note(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState({
    title: "",
    content: "",
    date: "",
  });

  function handleChange(e) {
    const name = e.target.attributes.name.nodeValue;
    const value = e.target.innerHTML;
    setEdit((prev) => {
      return { ...prev, [name]: value };
    });
  }

  function handleClick(e) {
    e.stopPropagation();
    if (edit.title === "" && edit.content === "") return;
    const date = new Date().toString().substring(0, 24);
    setOpen(!open);
    props.editNote({ ...edit, date }, props.id, props.date);
  }

  return (
    <div
      onClick={() => {
        setOpen(!open);
      }}
    >
      <div className="note">
        <h2>{props.header}</h2>
        <h1>{props.content}</h1>
        <p>{props.newDate}</p>
        <p>{props.date}</p>
        <span
          onClick={(e) => {
            e.stopPropagation();
            props.deleteNote(props.id);
          }}
        >
          🗑️
        </span>
      </div>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className="note">
            <h2
              contentEditable
              suppressContentEditableWarning
              name="title"
              onInput={handleChange}
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              {props.header}
            </h2>
            <h1
              contentEditable
              suppressContentEditableWarning
              name="content"
              onInput={handleChange}
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              {props.content}
            </h1>
            <p>{props.newDate}</p>
            <p>{props.date}</p>
            <p className="update" onClick={handleClick}>
              Update note
            </p>
            <span
              onClick={(e) => {
                e.stopPropagation();
                props.deleteNote(props.id);
                if (open) {
                  setOpen(!open);
                }
              }}
            >
              🗑️
            </span>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default Note;
