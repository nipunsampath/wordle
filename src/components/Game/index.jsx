import {useState, useEffect} from "react";
import Board from "../Board";
import Error from "../Error";
import Help from "../Help";
import KeyBoard from "../KeyBoard";
import Modal from "../Modal";
import NavBar from "../NavBar";
import styles from "./style.module.css";
import words from "../../words";
import {Button} from "@mui/material";
import StatusBar from "../StatusBar";

const wordPool = [...words];

const ALPHABET = "abcdefghijklmnopqrstuvwxyz";

function regenerateCorrectWord() {
  let index = Math.floor((Math.random() * wordPool.length) - 1);
  const correctWord = wordPool[index].toUpperCase();
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
  return {initialCorrectWord, initialLetters, initialBoard}
}

let {initialCorrectWord, initialLetters, initialBoard} = initializeGame()

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

  const reInitializeGame = () => {
    wordPool.splice(wordPool.indexOf(correctWord.toLowerCase()),1);

    const {initialCorrectWord, initialLetters, initialBoard} = initializeGame()

    setCorrectWord(initialCorrectWord);
    setBoard(initialBoard);
    setLetters(initialLetters);
    setRow(0);
    setCol(0);
    setWin(false);
    setLost(false);
    setMessage("");
  }

  const onClickDown = (event) => {
    if (event.key === "Enter") {
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
              letters={letters}
              setLetters={setLetters}
              error={setError}
              setWin={setWin}
              setLost={setLost}
              message={message}
              setMessage={setMessage}
          />
          <StatusBar win={win} lost={lost} message={message} gameState={isEnded}/>
          <KeyBoard keyHandler={keyHandler} letters={letters}/>
          <Button onClick={reInitializeGame}>Next</Button>
        </div>
      </>
  );
}

export default Game;
