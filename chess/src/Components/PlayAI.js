import { useRef, useState } from "react";
import Chess from "chess.js";
import "./play.css";
import { Chessboard } from "react-chessboard";
import cookieObj from "./GetCookies";
import { minimax } from "./ChessMLAlgorithm";
import Networking from "./Networking";
import { Redirect } from "react-router";

export default function PlayVsRandom(props) {
  const options = props.location.state.state;
  const depth = options.difficulty;
  const fen = props.location.state.fen;

  const cookieObject = cookieObj();

  const networking = new Networking();

  const chessboardRef = useRef();
  const [game, setGame] = useState(new Chess(fen));
  const [arrows, setArrows] = useState([]);
  const [boardOrientation, setBoardOrientation] = useState("white");
  const [currentTimeout, setCurrentTimeout] = useState(undefined);
  const [boardWidth, setBoardWidth] = useState(400);
  const [turn, addToTurn] = useState(0);
  const [inCheckMate, checkMate] = useState("");
  const [message, changeMessage] = useState("");
  const [redirect, changeRedirect] = useState(false);

  function safeGameMutate(modify) {
    setGame((g) => {
      const update = { ...g };
      modify(update);
      return update;
    });
  }

  async function makeMove() {
    const possibleMoves = game.moves();

    // exit if the game is over
    if (game.game_over() || game.in_draw() || possibleMoves.length === 0) {
      return;
    }

    const nextMove = moveToPlay(possibleMoves);
    safeGameMutate((game) => {
      game.move(nextMove);
    });
    if (game.in_checkmate() && inCheckMate === "") {
      checkMate("Black");
    }
  }
  function moveToPlay(possibleMoves) {
    if (options.difficulty === 1) {
      const randomIndex = Math.floor(Math.random() * possibleMoves.length);
      return possibleMoves[randomIndex];
    } else if (options.difficulty > 1) {
      return minimax(game, depth, true, 0, "b")[0];
    }
  }

  async function onDrop(sourceSquare, targetSquare) {
    addToTurn(turn + 1);
    const gameCopy = { ...game };
    const move = gameCopy.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q", // always promote to a queen for example simplicity
    });

    setGame(gameCopy);
    if (game.in_checkmate() && inCheckMate === "") {
      checkMate("White");
    }
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

  async function handleSaveGame() {
    const response = await networking.saveGame(
      cookieObject.user_id,
      options.reset,
      options.undo,
      options.optimalMove,
      options.difficulty,
      game.fen()
    );
    console.log(response);
    changeMessage(response.response);
    changeRedirect(true);
  }

  return (
    <div className="play">
      {message}
      {game.in_checkmate() ? (
        <div> {`Checkmate! The winner is ${inCheckMate}!`}</div>
      ) : null}
      {redirect ? (
        <Redirect to="/home" />
      ) : (
        <div>
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
              <button className="rc-button" onClick={handleSaveGame}>
                Save game
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
      )}
    </div>
  );
}
