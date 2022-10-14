import React from "react";

function Char(props) {
  return props.givenCharacter === props.typedCharacter ? (
    <span className="text-success fw-bolder fs-2 px-0 mx-0">
      {props.givenCharacter}
    </span>
  ) : props.typedCharacter === null ? (
    <span className="text-danger fw-bolder fs-2 px-0 mx-0">
      {props.givenCharacter}
    </span>
  ) : (
    <span className="text-info fw-bolder fs-2 px-0 mx-0">
      {props.givenCharacter}
    </span>
  );
}

export default Char;
