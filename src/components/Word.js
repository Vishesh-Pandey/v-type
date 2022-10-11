import React from "react";

function Word(props) {
  return (
    <span
      className={`${
        props.word["status"] === "untracked"
          ? "fs-2 opacity-100 text-secondary fw-bolder text-opacity-50"
          : props.word["status"] === "correct"
          ? "fs-2 text-success fw-bolder"
          : props.word["status"] === "incorrect"
          ? "fs-2 text-danger fw-bolder"
          : props.word["status"] === "partially-incorrect"
          ? "fs-2 text-danger fw-bolder opacity-50"
          : "fs-2 opacity-50"
      }`}
    >
      {props.word["word"] + " "}
    </span>
  );
}

export default Word;
