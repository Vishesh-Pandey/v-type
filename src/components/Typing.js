import "../App.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Word from "./Word";

import data from '../data.json'

function Typing() {
  const [startTime, setStartTime] = useState(0);
  const [acc, setacc] = useState(100); // accuracy
  const [correctCount, setCorrectCount] = useState(0); // correct number of words
  const [correctCharacters, setCorrectCharacters] = useState(0); // correct number of characters
  const [started, setStarted] = useState(false); // checks test on or off
  const [typedWord, setTypedWord] = useState(""); // current typed word
  const [current, setCurrent] = useState(0); // current correct word
  const [fullWordsCollectionArray, setFullWordsCollectionArray] = useState(data.words);

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

  const navigate = useNavigate();

  useEffect(() => {
    document.getElementById("userInput").focus();
  }, []);

  // function to reset everything when test restarts / new sentence is loaded
  const resetData = () => {
    setacc(100);
    setCorrectCount(0);
    setStarted(false);
    setTypedWord("");
    setCurrent(0);
    setCorrectCharacters(0);
  };

  // function to load a new sentence
  const loadWords = () => {
    let element = document.getElementById("sentence");
    element.classList.toggle("sentence-on-change");

    let wordsCollectionArray = [];

    // This loop will create array of random words
    for (let i = 0; i < totalWords; i++) {
      let index =
        Math.floor(Math.random() * 100) % fullWordsCollectionArray.length;
      wordsCollectionArray.push(fullWordsCollectionArray[index]);
    }

    // creating Object for words with details
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

  // this saves the data in localStorage and redirects user to /results
  const saveResults = () => {
    localStorage.setItem(
      "wpm",
      (correctCount + 1) / ((Date.now() - startTime) / (1000 * 60))
    );
    localStorage.setItem("acc", acc);
    localStorage.setItem(
      "cpm",
      correctCharacters / ((Date.now() - startTime) / (1000 * 60))
    );
    localStorage.setItem("seconds", (Date.now() - startTime) / 1000);
    navigate("/result");
  };

  // function which is called whenever user types something
  const handleOnChange = (event) => {
    // condition to check whether user just started the test if yes then it starts the timer
    if (started === false) {
      setStartTime(Date.now());
      console.log(startTime);
      setStarted(true); // setting started as true to prevent the execution of this block during the test
    }
    setTypedWord(event.target.value);

    // condition to end the test when user types last word
    if (current >= words.length - 1) {
      // Currently typing last word
      if (event.target.value === words[current]["word"]) {
        console.log("Last word completed and was typed correctly - end test");
        console.log("Accurate wpm");
        console.log(
          (correctCount + 1) / ((Date.now() - startTime) / (1000 * 60))
        );
        saveResults();
      }
      if (event.target.value.charAt(event.target.value.length - 1) === " ") {
        console.log("Last word completed and was typed incorrect - end test");
        console.log("Accurate wpm");
        console.log(correctCount / ((Date.now() - startTime) / (1000 * 60)));
        saveResults();
      }
      setFullWordsCollectionArray([])
    }

    // tracking
    if (
      event.target.value ===
      words[current].word.substring(0, event.target.value.length)
    ) {
      words[current].status = "tracking";
      setCorrectCharacters((correctCharacters) => correctCharacters + 1);
    } else {
      words[current].status = "partially-incorrect";
    }

    // word is completed and user entered blank space - ( not last word )
    if (event.target.value.charAt(event.target.value.length - 1) === " ") {
      if (event.target.value === words[current].word + " ") {
        words[current].status = "correct";
        // words[current].speed =   // wpm -> wpm
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
        <div className="row" style={{ minHeight: "250px" }}>
          <div id="sentence" className="col py-3 text-center fs-3 sentence">
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
      </div>
    </>
  );
}

export default Typing;
