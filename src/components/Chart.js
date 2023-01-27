import React from "react";
import { useNavigate } from "react-router-dom";

function Chart() {
  const navigate = useNavigate();

  const restartTest = () => {
    navigate("/v-type");
  };
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="col-12 text-center fs-1">Results!</div>
          </div>
        </div>
        <div className="row py-2">
          <div className="col-sm-6 m-auto bg-secondary bg-opacity-25 rounded-4 py-2">
            <table className="table text-center fs-1 m-auto">
              <tbody>
                <tr className="fs-1">
                  <td>WPM</td>
                  <td>{localStorage.getItem("wpm").slice(0, 5)}</td>
                </tr>
                <tr className="fs-2">
                  <td>Accuracy</td>
                  <td>{localStorage.getItem("acc").slice(0, 5)}%</td>
                </tr>
                <tr className="fs-3">
                  <td>CPM</td>
                  <td>{localStorage.getItem("cpm").slice(0, 5)}</td>
                </tr>
                <tr className="fs-4">
                  <td>Time</td>
                  <td>{localStorage.getItem("seconds").slice(0, 5)} seconds</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="row">
          <div className="col-12 text-center">
            <button onClick={restartTest} className="btn btn-secondary">
              Restart Test
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Chart;
