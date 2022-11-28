import React, { useState, useRef } from "react";
import Word from "./Word";

function Typing() {
  const timer = useRef(null);
  const [wpm, setwpm] = useState(0);
  const [acc, setacc] = useState(100);
  const [correctCount, setCorrectCount] = useState(0);
  const [correctCharacters, setCorrectCharacters] = useState(0);
  const [started, setStarted] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [typedWord, setTypedWord] = useState("");
  const [current, setCurrent] = useState(0);
  const [wordsCollection, setWordsCollection] = useState(
    "hello world two nine go seven you love sum cosmos sun universe can beat you for anything like that put for amazing coding future beat stand under tree god around world phase yes library for building user interfaces based also called a schoolteacher or formally an educator is a person who helps students to acquire knowledge vishesh"
  ); // contains all the words
  const [fullWordsCollectionArray, setFullWordsCollectionArray] = useState(
    wordsCollection.split(" ")
  ); // contains all the words in an array

  let totalWords = 12; // default number of words for the test
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
  ]); // this is the sample text written at the beginning ( Greet )

  // function to reset everything when test restarts / new sentence is loaded
  const resetData = () => {
    setwpm(0);
    setacc(100);
    setCorrectCount(0);
    setStarted(false);
    setSeconds(0);
    setTypedWord("");
    setCurrent(0);
    setCorrectCharacters(0);
  };

  // function to load a new sentence
  const loadWords = () => {
    document.body.style.backgroundColor = "white"; // as after completing the background becomes yellow
    let wordsCollectionArray = [];

    // This loop will create array of random words
    for (let i = 0; i < totalWords; i++) {
      let index =
        Math.floor(Math.random() * 100) % fullWordsCollectionArray.length;
      wordsCollectionArray.push(fullWordsCollectionArray[index]);
    }

    // creating Object for words with details
    clearInterval(timer.current);
    timer.current = null;
    resetData();
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

  // possible conditions for the words - current , correct , incorrect , normal

  // function which is called whenever user types something
  const handleOnChange = (event) => {
    if (current >= words.length - 1) {
      // Currently typing last word
      if (event.target.value === words[current]["word"]) {
        // Last word completed
        clearInterval(timer.current);
        document.body.style.backgroundColor = "yellow";
      }
      if (event.target.value.charAt(event.target.value.length - 1) === " ") {
        // Last word completed
        clearInterval(timer.current);
        document.body.style.backgroundColor = "yellow";
      }
    }
    // condition to check whether user just started the test if yes then it starts the timer
    if (started === false) {
      timer.current = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
      setStarted(true); // setting started as true to prevent the execution of this block during the test
    }
    setTypedWord(event.target.value);

    if (
      event.target.value ===
      words[current].word.substring(0, event.target.value.length)
    ) {
      words[current].status = "tracking";
      setCorrectCharacters((correctCharacters) => correctCharacters + 1);
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
      // Using function to change the value of useState
      setCurrent((current) => {
        return current + 1;
      });
    }
    setwpm((correctCount / (seconds / 60)).toFixed(2));
    setacc(((correctCount / current) * 100).toFixed(2));
  };

  return (
    <>
      <div className="container pt-4">
        <div className="row d-flex justify-content-center">
          <div className="col-xl-1 col-lg-2 col-md-3 col-3 text-center">
            <button
              onClick={() => {
                totalWords = 12;
                loadWords();
              }}
              className="btn btn-secondary rounded-pill w-75"
            >
              12
            </button>
          </div>
          <div className="col-xl-1 col-lg-2 col-md-3 col-3 text-center">
            <button
              onClick={() => {
                totalWords = 25;
                loadWords();
              }}
              className="btn btn-secondary rounded-pill w-75"
            >
              25
            </button>
          </div>
          <div className="col-xl-1 col-lg-2 col-md-3 col-3 text-center">
            <button
              onClick={() => {
                totalWords = 30;
                loadWords();
              }}
              className="btn btn-secondary rounded-pill w-75"
            >
              30
            </button>
          </div>
          <div className="col-xl-1 col-lg-2 col-md-3 col-3 text-center">
            <button
              onClick={() => {
                totalWords = 40;
                loadWords();
              }}
              className="btn btn-secondary rounded-pill w-75"
            >
              40
            </button>
          </div>
        </div>
        <div className="row" style={{ minHeight: "200px" }}>
          <div className="col py-3 text-center fs-3">
            {words.map((word, index) => {
              return <Word key={index} word={word} typedWord={typedWord} />;
            })}
          </div>
        </div>
        <div className="row">
          <div className="col text-center">
            <input
              id="userInput"
              className="border border-5 rounded-pill fs-4 text-center"
              type="text"
              value={typedWord}
              onChange={handleOnChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="col text-center py-3">
            <button onClick={loadWords} className="btn btn-secondary">
              Load Sentence
            </button>
          </div>
        </div>
        <div className="row py-2">
          <div className="col-sm-6 m-auto bg-secondary bg-opacity-25 rounded-4 py-2">
            <table className="table text-center fs-1 m-auto">
              <tbody>
                <tr className="fs-1">
                  <td>WPM</td>
                  <td>{wpm}</td>
                </tr>
                <tr className="fs-2">
                  <td>Accuracy</td>
                  <td>{acc}%</td>
                </tr>
                <tr className="fs-3">
                  <td>CPM</td>
                  <td>{(correctCharacters / (seconds / 60)).toFixed(2)}</td>
                </tr>
                <tr className="fs-4">
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
