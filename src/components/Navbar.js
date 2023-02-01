import React, { useState } from "react";
import logo from "./favicon_ico.png";
import Darkmode from "./dark_mode.svg";
import Lightmode from "./light_mode.svg";

function Navbar() {
  const [textTheme, setTextTheme] = useState("dark");
  const [theme, setTheme] = useState("light");

  const changeTheme = () => {
    if (theme == "dark") {
      setTheme("light");
      setTextTheme("dark");
    } else {
      setTheme("dark");
      setTextTheme("light");
    }
  };

  return (
    <>
      <nav className={`navbar navbar-expand-lg bg-${theme} shadow-sm`}>
        <div className="container-fluid">
          <a className="navbar-brand" href="/v-type">
            <img width="40px" src={logo} alt="" />
          </a>
          <a className={`navbar-brand text-${textTheme}`} href="/v-type">
            vType
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a
                  className={`nav-link active text-${textTheme}`}
                  aria-current="page"
                  href="/"
                >
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a
                  target="_blank"
                  rel="noreferrer"
                  className={`nav-link active text-${textTheme}`}
                  aria-current="page"
                  href="https://vishesh-pandey.github.io/v-images/"
                >
                  vImages
                </a>
              </li>
              <li className="nav-item">
                <a
                  target="_blank"
                  rel="noreferrer"
                  className={`nav-link active text-${textTheme}`}
                  aria-current="page"
                  href="https://vishesh-pandey.github.io/v-notes/"
                >
                  vNotes
                </a>
              </li>
            </ul>
            <a href="#">
              <img
                src={theme == "light" ? Darkmode : Lightmode}
                alt=""
                onClick={changeTheme}
                width={30}
                data-bs-toggle="tooltip"
                data-bs-placement="bottom"
                data-bs-title="Tooltip on bottom"
              />
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
