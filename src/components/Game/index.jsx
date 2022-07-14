import {useState, useEffect} from "react";
import Board from "../Board";
import Error from "../Error";
import Help from "../Help";
import KeyBoard from "../KeyBoard";
import Modal from "../Modal";
import NavBar from "../NavBar";
import styles from "./style.module.css";
import words from "../../words";
import StatusBar from "../StatusBar";
import ControlPanel from "../ControlPanel";

const ALPHABET = "abcdefghijklmnopqrstuvwxyz";
const timeLimit = 600;

function regenerateCorrectWord() {
  let index = Math.floor((Math.random() * words.length) - 1);
  const correctWord = words[index].toUpperCase();
  console.log("initializing correctWord word", correctWord)
  return correctWord;
}

const initializeGame = () => {
  const initialCorrectWord = regenerateCorrectWord();
  let initialBoard = [];
  let initialLetters = [];

  ALPHABET.split("").forEach((i) => {
    initialLetters[i] = "";
  });

  for (let i = 0; i < 6; i++) {
    initialBoard.push([]);
    for (let j = 0; j < 5; j++) {
      initialBoard[i].push(["", ""]);
    }
  }
  const initDate = Date.now() + 1000 * timeLimit;
  return {initialCorrectWord, initialLetters, initialBoard, initDate}
}

let {initialCorrectWord, initialLetters, initialBoard, initDate} = initializeGame()

function Game(props) {

  // Game states
  const [letter, setLetter] = useState("");
  const [changed, setChanged] = useState(false);
  const [correctWord, setCorrectWord] = useState(initialCorrectWord)
  const [board, setBoard] = useState(initialBoard);
  const [letters, setLetters] = useState(initialLetters);
  const [row, setRow] = useState(0);
  const [col, setCol] = useState(0);
  const [win, setWin] = useState(false);
  const [lost, setLost] = useState(false);
  const [message, setMessage] = useState("");
  const [isEnded, setIsEnded] = useState(false);

  const [help, setHelp] = useState(false);
  const [clicked, setClicked] = useState(0);
  const [error, setError] = useState("");
  const [dark, setDark] = useState(false);
  const [timerKey, setTimerKey] = useState(1);
  const [initialDate, setInitialDate] = useState(initDate);

  const reInitializeGame = () => {
    words.splice(words.indexOf(correctWord.toLowerCase()),1);

    const {initialCorrectWord, initialLetters, initialBoard,initDate} = initializeGame()

    setTimerKey(timerKey+1);
    setCorrectWord(initialCorrectWord);
    setBoard(initialBoard);
    setLetters(initialLetters);
    setRow(0);
    setCol(0);
    setWin(false);
    setLost(false);
    setMessage("");
    setInitialDate(initDate);
  }

  const handleTimerCompletion = () => {
    setLost(true);
    setTimeout(() => {
      setMessage(`Time's up team! ⌛`);
    }, 250);
  }

  const showAnswer = () => {
    setLost(true);
    setTimeout(() => {
      setMessage(`The word was ${correctWord}`);
    }, 250);
  }

  const onClickDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setLetter("ENTER");
      setClicked(clicked + 1);
    } else if (event.key === "Backspace") {
      setLetter("DEL");
      setClicked(clicked + 1);
    } else if (ALPHABET.includes(event.key.toLowerCase())) {
      setLetter(event.key.toUpperCase());
      setClicked(clicked + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", onClickDown);

    return () => window.removeEventListener("keydown", onClickDown);
  });

  useEffect(() => {
    props.darkness(dark);
  }, [dark]);

  const keyHandler = (letterValue) => {
    setLetter(letterValue);
    setClicked(clicked + 1);
  };

  useEffect(() => {
    setChanged(!changed);
  }, [letters])

  useEffect(()=>{
    setIsEnded(win || lost);
  },[win,lost])

  return (
      <>
        {help && (
            <Modal title="How to play!" help={setHelp}>
              {" "}
              <Help/>{" "}
            </Modal>
        )}
        {error && <Error>{error}</Error>}
        <div className={styles.game}>
          <NavBar help={setHelp} darkness={setDark} dark={dark}/>
          <hr/>
          <Board
              isEnded={isEnded}
              row={row}
              setRow={setRow}
              col={col}
              setCol={setCol}
              correctWord={correctWord}
              board={board}
              setBoard={setBoard}
              letter={letter}
              clicks={clicked}
              setLetters={setLetters}
              setError={setError}
              setWin={setWin}
              setLost={setLost}
              setMessage={setMessage}
          />
          <StatusBar message={message} isEnded={isEnded} handleTimerCompletion={handleTimerCompletion} timerKey={timerKey} initialDate={initialDate}/>
          <KeyBoard keyHandler={keyHandler} letters={letters}/>
          <hr/>
          <ControlPanel reInitializeGame={reInitializeGame} showAnswer={showAnswer}/>

        </div>
      </>
  );
}

export default Game;
