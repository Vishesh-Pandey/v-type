import React, { useState } from "react";
import { Link } from "react-router-dom";

import logo from "./favicon_ico.png";

function Navbar() {
  const [textTheme, setTextTheme] = useState("dark");
  const [theme, setTheme] = useState("light");

  const changeTheme = () => {
    if (theme === "dark") {
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
          <a className={`navbar-brand text-${textTheme}`} href="/v-type">
            <img width="30px" className="mx-2" src={logo} alt="" />
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
                <Link
                  className={`nav-link active text-${textTheme}`}
                  aria-current="page"
                  href="/v-type"
                >
                  Home
                </Link>
              </li>
            </ul>
            <a href="https://github.com/Vishesh-Pandey/v-type" target="_blank" rel="noreferrer" className={`btn mx-2 ${theme === "dark" ? "btn-outline-light" : "btn-outline-dark"}`}><i className="bi bi-github"></i></a>
            <button className="btn btn-outline-dark mx-2">
              <i onClick={changeTheme} className={`nav-link ${theme === "dark" ? "bi bi-brightness-high-fill text-light" : "bi bi-moon-stars-fill"}`}></i>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
