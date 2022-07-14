import { useState } from "react";
import "./App.css";
import Game from "./components/Game";

function App() {
  const darkHandler = (dark) => {
    if (dark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  };
  
  return (
    <div className={"app dark:bg-zinc-800"}>
      <Game darkness={darkHandler}/>

      <footer className="p-4 rounded-lg md:flex md:items-center md:justify-between md:p-6">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          A big shout-out to <a href="https://github.com/MahmoudFettal/wordle" className="hover:underline">WORDLE</a> by Mahmoud Fettal
        </span>
      </footer>
    </div>

  );
}

export default App;
