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

  const [inCheckMate, checkMate] = useState("");
  const [message, changeMessage] = useState("");
  const [redirect, changeRedirect] = useState(false);
  const [userColour, changeColour] = useState(undefined);
  const aiColour = userColour === "w" ? "b" : "w";
  function safeGameMutate(modify) {
    setGame((g) => {
      const update = { ...g };
      modify(update);
      return update;
    });
  }

  async function makeMove() {
    const possibleMoves = game.moves({ verbose: true });

    // exit if the game is over
    if (game.game_over() || game.in_draw() || possibleMoves.length === 0) {
      return;
    }

    const nextMove = moveToPlay(possibleMoves);

    safeGameMutate((game) => {
      game.move(nextMove);
    });
    if (game.in_checkmate() && inCheckMate === "") {
      checkMate(aiColour);
    }
  }
  function moveToPlay(possibleMoves) {
    if (depth === "0") {
      const randomIndex = Math.floor(Math.random() * possibleMoves.length);

      return possibleMoves[randomIndex];
    } else if (depth === "1" || depth === "2" || depth === "3") {
      const depthInt = parseInt(depth);
      return minimax(game, depthInt, true, 0, "b")[0];
    }
  }

  async function onDrop(sourceSquare, targetSquare) {
    const gameCopy = { ...game };
    const move = gameCopy.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q", // always promote to a queen for example simplicity
    });

    setGame(gameCopy);
    if (game.in_checkmate() && inCheckMate === "") {
      checkMate(userColour);
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

    const bestMove = minimax(game, 2, true, 0, userColour)[0];
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

    changeMessage(response.response);
    changeRedirect(true);
  }
  const pieces = [
    "wP",
    "wN",
    "wB",
    "wR",
    "wQ",
    "wK",
    "bP",
    "bN",
    "bB",
    "bR",
    "bQ",
    "bK",
  ];

  function customPieces() {
    const returnPieces = {};
    pieces.map((p) => {
      returnPieces[p] = ({ squareWidth }) => (
        <div
          style={{
            width: squareWidth,
            height: squareWidth,
            backgroundImage: `url(/media/${p}.png)`,
            backgroundSize: "100%",
          }}
        />
      );
      return null;
    });
    return returnPieces;
  }

  async function changeUserColour(e) {
    let choice;
    if (e.target.id !== "r") {
      choice = e.target.id;
      await changeColour(choice);
    } else {
      const colours = ["w", "b"];
      choice = colours[Math.floor(Math.random() * 2)];
      await changeColour(choice);
    }
    const orientation = choice === "w" ? "white" : "black";
    setBoardOrientation(orientation);
    if (choice === "b") {
      setTimeout(makeMove, 200);
      return;
    }
  }

  return (
    <div className="play">
      {" "}
      {!userColour ? (
        <div>
          <button id="w" onClick={changeUserColour}>
            Play white
          </button>
          <button id="b" onClick={changeUserColour}>
            Play black
          </button>
          <button id="r" onClick={changeUserColour}>
            Random
          </button>
        </div>
      ) : (
        <div>
          {" "}
          {message}
          {game.in_checkmate() ? (
            <div> {`Checkmate! The winner is ${inCheckMate}!`}</div>
          ) : (
            <div> {`Stalemate!`}</div>
          )}
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
                customDarkSquareStyle={{ backgroundColor: "green" }}
                customLightSquareStyle={{ backgroundColor: "cream" }}
                customPieces={customPieces}
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
      )}
    </div>
  );
}
