import React from "react";
import logo from "./favicon_ico.png";

function Navbar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-secondary bg-opacity-25 shadow-sm">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img width="40px" src={logo} alt="" />
          </a>
          <a className="navbar-brand" href="#">
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
                <a className="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a
                  target="_blank"
                  className="nav-link active"
                  aria-current="page"
                  href="https://vishesh-pandey.github.io/v-images/"
                >
                  vImages
                </a>
              </li>
              <li className="nav-item">
                <a
                  target="_blank"
                  className="nav-link active"
                  aria-current="page"
                  href="https://vishesh-pandey.github.io/v-notes/"
                >
                  vNotes
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
