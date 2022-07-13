import { useEffect } from "react";
import Box from "../Box";
import words from "../../words";


const Board = props => {
  const {isEnded, row, col, setRow, setCol, clicks, letter, board, setBoard, error, correct, setLetters, setWin, setLost, setMessage} = props;

  useEffect(() => {
    if (isEnded) {
      console.log("Game ended!");
    } else {
      if (clicks !== 0) {
        if (letter === "DEL") {
          setCol(col === 0 ? 0 : col - 1);
          setBoard((prevBoard) => {
            prevBoard[row][col === 0 ? 0 : col - 1][0] = "";
            return prevBoard;
          });
        } else {
          setBoard((prevBoard) => {
            if (col < 5) {
              if (letter !== "ENTER") {
                prevBoard[row][col][0] = letter;
                setCol(col + 1);
              } else {
                error("Words are 5 letters long!");
                setTimeout(() => {
                  error("");
                }, 1000);
              }
            } else {
              if (letter === "ENTER") {
                let correctLetters = 0;
                let word = "";
                for (let i = 0; i < 5; i++) {
                  word += prevBoard[row][i][0];
                }
                if (words.includes(word.toLowerCase())) {
                  for (let i = 0; i < 5; i++) {
                    if (correct[i] === prevBoard[row][i][0]) {
                      prevBoard[row][i][1] = "C";
                      correctLetters++;
                    } else if (correct.includes(prevBoard[row][i][0]))
                      prevBoard[row][i][1] = "E";
                    else prevBoard[row][i][1] = "N";
                    setRow(row + 1);
                    if (row === 5) {
                      setLost(true);
                      setTimeout(() => {
                        setMessage(`It was ${correct}`);
                      }, 750);
                    }

                    setCol(0);
                    setLetters((prev) => {
                      prev[board[row][i][0].toLowerCase()] = board[row][i][1];
                      return prev;
                    });
                  }

                  if (correctLetters === 5) {
                    setWin(true);
                    setTimeout(() => {
                      setMessage("You WIN");
                    }, 750);
                  }
                  return prevBoard;
                } else {
                  error("Word not in dictionary");
                  setTimeout(() => {
                    error("");
                  }, 1000);
                }
              }
            }
            return prevBoard;
          });
        }
      }
    }
  }, [clicks]);

  return (
    <div className="px-10 py-5 grid gap-y-1 items-center w-100 justify-center">
      {board.map((row, key) => {
        return (
            <div key={key} className="flex gap-1 w-fit">
              {row.map((value, key) => (
                  <Box key={key} value={value[0]} state={value[1]} pos={key}/>
              ))}
            </div>
        );
      })}
    </div>
  );
};

export default Board;
