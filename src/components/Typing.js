import React, { useState, useRef } from "react";
import Word from "./Word";

function Typing() {
  const timer = useRef(null);
  const [wpm, setwpm] = useState(0);
  const [acc, setacc] = useState(100);
  const [correctCount, setCorrectCount] = useState(0);
  const [started, setStarted] = useState(false);
  const [seconds, setSeconds] = useState(0);

  const [typedWord, setTypedWord] = useState("");
  const [current, setCurrent] = useState(0);
  const [wordsCollection, setWordsCollection] = useState(
    "hello world two nine go seven you love sum cosmos sun universe"
  ); // contains all the words
  const [wordsCollectionArray, setWordsCollectionArray] = useState(
    wordsCollection.split(" ")
  );

  const [words, setWords] = useState([
    //sample word object
    {
      word: "hello",
      status: "untracked",
      speed: -1,
      accuracy: 0,
    },
    {
      word: "world",
      status: "untracked",
      speed: -1,
      accuracy: 0,
    },
  ]);

  const resetData = () => {
    setwpm(0);
    setacc(100);
    setCorrectCount(0);
    setStarted(false);
    setSeconds(0);
    setTypedWord("");
    setCurrent(0);
  };

  const loadWords = () => {
    // creating Object for words with details
    clearInterval(timer.current);
    timer.current = null;
    resetData();
    setCurrent(0);
    let wordsCopy = [];
    for (let i = 0; i < wordsCollectionArray.length; i++) {
      wordsCopy.push({
        word: wordsCollectionArray[i],
        status: "untracked",
        speed: -1,
        accuracy: 0,
      });
    }
    setWords(wordsCopy);
    document.getElementById("userInput").focus();
  };

  // conditions for the words - current , correct , incorrect , normal

  const handleOnChange = (event) => {
    if (current > words.length - 1) {
      clearInterval(timer.current);
      return;
    }
    if (started === false) {
      timer.current = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
      setStarted(true);
    }
    setTypedWord(event.target.value);

    if (
      event.target.value ===
      words[current].word.substring(0, event.target.value.length)
    ) {
      words[current].status = "tracking";
    } else {
      words[current].status = "partially-incorrect";
    }
    if (event.target.value.charAt(event.target.value.length - 1) === " ") {
      if (event.target.value === words[current].word + " ") {
        words[current].status = "correct";
        setCorrectCount(correctCount + 1);
      } else {
        words[current].status = "incorrect";
      }
      setTypedWord("");
      setCurrent(current + 1);
    }
    setwpm((correctCount / (seconds / 60)).toFixed(2));
    setacc(((correctCount / current) * 100).toFixed(2));
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col py-5 text-center fs-3">
            {words.map((word, index) => {
              return <Word key={index} word={word} typedWord={typedWord} />;
            })}
          </div>
        </div>
        <div className="row">
          <div className="col text-center">
            <input
              id="userInput"
              className="border border-5 rounded-pill fs-2 text-center"
              type="text"
              value={typedWord}
              onChange={handleOnChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="col text-center py-5">
            <button onClick={loadWords} className="btn btn-secondary">
              Load Sentence
            </button>
          </div>
        </div>
        <div className="row py-5">
          <div className="col-6 m-auto">
            <table className="table text-center fs-1">
              <tbody>
                <tr>
                  <td>WPM</td>
                  <td>{wpm}</td>
                </tr>
                <tr>
                  <td>Accuracy</td>
                  <td>{acc}%</td>
                </tr>
                <tr className="fs-6">
                  <td>Time</td>
                  <td>{seconds} seconds</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Typing;
