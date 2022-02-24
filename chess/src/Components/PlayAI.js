import { useRef, useState } from "react";
import Chess from "chess.js";
import "./play.css";
import { Chessboard } from "react-chessboard";
import {
  weights,
  pst_w,
  pst_b,
  pst_opponent,
  pst_self,
} from "./ChessMLAlgorithm.js";
import { evaluateBoard, minimax } from "./ChessMLAlgorithm";

export default function PlayVsRandom(props) {
  const chessboardRef = useRef();
  const [game, setGame] = useState(new Chess());
  const [arrows, setArrows] = useState([]);
  const [boardOrientation, setBoardOrientation] = useState("white");
  const [currentTimeout, setCurrentTimeout] = useState(undefined);
  const [boardWidth, setBoardWidth] = useState(400);
  const [turn, addToTurn] = useState(0);

  const options = props.location.state.state;

  function safeGameMutate(modify) {
    setGame((g) => {
      const update = { ...g };
      modify(update);
      return update;
    });
  }

  function makeMove() {
    const possibleMoves = game.moves();

    // exit if the game is over
    if (game.game_over() || game.in_draw() || possibleMoves.length === 0) {
      return;
    }

    const nextMove = moveToPlay(possibleMoves);
    safeGameMutate((game) => {
      game.move(nextMove);
    });
  }
  function moveToPlay(possibleMoves) {
    if (options.difficulty === "easy") {
      const randomIndex = Math.floor(Math.random() * possibleMoves.length);
      return possibleMoves[randomIndex];
    } else if (options.difficulty === "hard") {
      return minimax(game, 2, true, 0, "b")[0];
    }
  }

  function onDrop(sourceSquare, targetSquare) {
    addToTurn(turn + 1);
    const gameCopy = { ...game };
    const move = gameCopy.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q", // always promote to a queen for example simplicity
    });

    setGame(gameCopy);

    // illegal move
    if (move === null) return false;

    // store timeout so it can be cleared on undo/reset so computer doesn't execute move

    const newTimeout = setTimeout(makeMove, 200);
    setCurrentTimeout(newTimeout);
    return true;
  }

  function setBoardWidthButton(e) {
    e.target.value === "plus"
      ? setBoardWidth(boardWidth + 100)
      : setBoardWidth(boardWidth - 100);
  }

  function getOptimalMoves() {
    //moves shows all possible moves a white piece can take

    const bestMove = minimax(game, 2, true, 0, "w")[0];
    setArrows([[bestMove.from, bestMove.to]]);
  }

  return (
    <div className="play">
      <Chessboard
        id="PlayVsRandom"
        animationDuration={200}
        boardOrientation={boardOrientation}
        boardWidth={boardWidth}
        customArrows={arrows}
        position={game.fen()}
        onPieceDrop={onDrop}
        customBoardStyle={{
          borderRadius: "4px",
          boxShadow: "0 5px 15px rgba(0, 0, 0, 0.5)",
        }}
        ref={chessboardRef}
      />
      <div className="buttons">
        <button
          disabled={!options.reset}
          className="rc-button"
          onClick={() => {
            safeGameMutate((game) => {
              game.reset();
            });
            // stop any current timeouts
            clearTimeout(currentTimeout);
          }}
        >
          reset
        </button>
        <button
          className="rc-button"
          onClick={() => {
            setBoardOrientation((currentOrientation) =>
              currentOrientation === "white" ? "black" : "white"
            );
          }}
        >
          flip board
        </button>
        <button
          disabled={!options.undo}
          className="rc-button"
          onClick={() => {
            safeGameMutate((game) => {
              game.undo();
              game.undo();
            });
            // stop any current timeouts
            clearTimeout(currentTimeout);
          }}
        >
          undo
        </button>
        <button
          className="rc-button"
          disabled={!options.optimalMove}
          onClick={getOptimalMoves}
        >
          Get Hints
        </button>
        <div>
          <button
            className="rc-button"
            onClick={(e) => setBoardWidthButton(e)}
            value="plus"
          >
            +
          </button>
          <button
            className="rc-button"
            onClick={(e) => setBoardWidthButton(e)}
            value="minus"
          >
            -
          </button>
        </div>
        <div className="chat-wrapper">
          <ul className="events"></ul>
          <div className="chat-from-wrapper">
            <form>
              <input className="chat" autoComplete="off" title="chat" />
              <button className="chat-button">Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
