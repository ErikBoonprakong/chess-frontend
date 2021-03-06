import { useRef, useState } from "react";
import * as Chess from "chess.js";

import "./play.css";
import { Chessboard } from "react-chessboard";
import cookieObj from "./GetCookies";
import { minimax } from "./ChessMLAlgorithm";
import Networking from "./Networking";
import { Redirect } from "react-router";

export default function PlayAI(props) {
  const options = props.location.state.state;
  const depth = parseInt(options.difficulty);
  const fen = props.location.state.fen;

  const cookieObject = cookieObj();

  const networking = new Networking();

  const chessboardRef = useRef();

  const [game, setGame] = useState(
    props.location.chessboard ? props.location.chessboard : new Chess(fen)
  );

  const [arrows, setArrows] = useState([]);
  const [boardOrientation, setBoardOrientation] = useState(
    options.usercolour === "w" ? "white" : "black"
  );
  const [currentTimeout, setCurrentTimeout] = useState(undefined);
  const [boardWidth, setBoardWidth] = useState(400);
  const [inCheck, changeInCheck] = useState("");
  const [inCheckMate, checkMate] = useState("");
  const [message, changeMessage] = useState("");
  const [redirect, changeRedirect] = useState(false);
  const [userColour, changeColour] = useState(options.usercolour);
  const [lightSquareColour] = useState("beige");
  const [darkSquareColour] = useState("tan");

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
    if (game.in_check()) {
      changeInCheck(`${cookieObject.user} is in check!`);
    }
  }
  function moveToPlay(possibleMoves) {
    if (depth === 0) {
      const randomIndex = Math.floor(Math.random() * possibleMoves.length);

      return possibleMoves[randomIndex];
    } else if (depth > 0) {
      return minimax(game, depth, true, 0, aiColour)[0];
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
      checkMate(cookieObject.user);
    }
    if (game.in_check()) {
      changeInCheck("");
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
      userColour,
      game.fen()
    );

    changeMessage(response.response);
    changeRedirect(true);
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

  function renderHintButtons() {
    return (
      <div className="hint-btn-div">
        <div className="hint-btn">
          <button
            disabled={!options.reset}
            className={options.reset ? "rc-button" : "disabled-btn"}
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
            disabled={!options.undo}
            className={options.undo ? "rc-button" : "disabled-btn"}
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
            className={options.optimalMove ? "rc-button" : "disabled-btn"}
            disabled={!options.optimalMove}
            onClick={getOptimalMoves}
          >
            Get Hints
          </button>
        </div>
        <div className="more-btn">
          <button
            className="rc-button"
            onClick={(e) => setBoardWidthButton(e)}
            value="minus"
          >
            -
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
            className="rc-button"
            onClick={(e) => setBoardWidthButton(e)}
            value="plus"
          >
            +
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="full-page-ai">
      {" "}
      {!userColour ? (
        <div>
          <button className="button" id="w" onClick={changeUserColour}>
            Play White
          </button>
          <button className="button" id="b" onClick={changeUserColour}>
            Play Black
          </button>
          <button className="button" id="r" onClick={changeUserColour}>
            Random
          </button>
        </div>
      ) : (
        <div className="play">
          {" "}
          <div data-testid="play-ai-message">{message}</div>
          {game.in_checkmate() ? (
            <div> {`Checkmate! The winner is ${inCheckMate}!`}</div>
          ) : null}
          {game.in_stalemate() ? <div> {`Stalemate!`}</div> : null}
          {game.in_check() && options.inCheck ? <div> {inCheck}</div> : null}
          {game.in_draw() ? <div> {`Draw!`}</div> : null}
          {redirect ? (
            <Redirect to="/home" />
          ) : (
            <div className="boardAndButtons">
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
                customDarkSquareStyle={{ backgroundColor: darkSquareColour }}
                customLightSquareStyle={{ backgroundColor: lightSquareColour }}
                ref={chessboardRef}
              />
              <div className="buttons">
                {renderHintButtons()}

                <div>
                  <button className="button" onClick={handleSaveGame}>
                    Save game
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
