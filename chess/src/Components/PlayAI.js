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
  // function makeSLightlyLessRandomMove() {
  //   const possibleMoves = game.moves();
  //   console.log("less random");
  //   // exit if the game is over
  //   if (game.game_over() || game.in_draw() || possibleMoves.length === 0) {
  //     return;
  //   }

  //   const move = getOptimalMoves();
  //   safeGameMutate((game) => {
  //     game.move(move);
  //   });
  // }

  function makeGoodMoves() {
    const possibleMoves = game.moves();

    // exit if the game is over
    if (game.game_over() || game.in_draw() || possibleMoves.length === 0) {
      return;
    }

    const bestMove = minimax(game, 2, true, 0, "b")[0];
    safeGameMutate((game) => {
      game.move(bestMove);
    });
  }
  // function makeRandomMove() {
  //   const possibleMoves = game.moves();

  //   // exit if the game is over
  //   if (game.game_over() || game.in_draw() || possibleMoves.length === 0) {
  //     return;
  //   }

  //   const randomIndex = Math.floor(Math.random() * possibleMoves.length);
  //   safeGameMutate((game) => {
  //     game.move(possibleMoves[randomIndex]);
  //   });
  // }
  // console.log(game.moves({ verbose: true }));
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
    // const newTimeout = setTimeout(makeRandomMove, 200);
    const newTimeout = setTimeout(makeGoodMoves, 200);
    setCurrentTimeout(newTimeout);
    return true;
  }

  function setBoardWidthButton(e) {
    e.target.value === "plus"
      ? setBoardWidth(boardWidth + 100)
      : setBoardWidth(boardWidth - 100);
  }
  //// good moves are in random order. order them in importance
  // 'n' - a non-capture
  // 'b' - a pawn push of two squares
  // 'e' - an en passant capture
  // 'c' - a standard capture
  // 'p' - a promotion
  // 'k' - kingside castling
  // 'q' - queenside castling
  function getOptimalMoves() {
    //moves shows all possible moves a white piece can take
    const currentGame = game.moves({ verbose: true });

    const orderedMoves = sort(currentGame);
    const topMoves = assessPotentialOpponentMoves(orderedMoves);
    console.log(topMoves[Math.random() * 4]);
    return topMoves[Math.random() * 4];
  }

  function assessPotentialOpponentMoves(movesArray) {
    const movesWithoutCapture = [];

    movesArray.forEach((move) => {
      game.move(move);
      const opponentMoveArray = game.moves({ verbose: true });
      const doesArrayContainCapture = opponentMoveArray.some((move) => {
        const flags = move.flags;
        return flags !== "c";
      });
      if (doesArrayContainCapture) {
        movesWithoutCapture.push(move);
      }

      game.undo();
    });
    return [
      movesWithoutCapture[0],
      movesWithoutCapture[1],
      movesWithoutCapture[2],
      movesWithoutCapture[3],
    ];
  }

  function sort(currentGame) {
    // const moves = currentGame.moves({ verbose: true });
    const sortBy = { q: 0, p: 1, k: 2, c: 3, e: 4, b: 5, n: 6 };
    return currentGame.sort((a, b) => {
      var A = a.flags,
        B = b.flags;
      if (sortBy[A] > sortBy[B]) {
        return 1;
      } else {
        return -1;
      }
    });
    //need to add an additional filter that filters out the moves where you're captured after
  }

  return (
    <div className="play">
      {/* {gameInCheck()} */}
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
        <button className="rc-button" onClick={getOptimalMoves}>
          Set Custom Arrows
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
