import { Route, Routes } from "react-router-dom";
import "./App.css";
import Chart from "./components/Chart";
import Navbar from "./components/Navbar";
import Typing from "./components/Typing";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Typing />} />
        <Route path="/result" element={<Chart />} />
      </Routes>
    </>
  );
}

export default App;
