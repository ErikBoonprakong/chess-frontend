import { useEffect, useRef, useState } from "react";
import Chess from "chess.js";
import "./play.css";

import { Chessboard } from "react-chessboard";
// import { w3cwebsocket as W3CWebSocket } from "websocket";

// const client = new W3CWebSocket("ws://127.0.0.1:8000");

export default function PlayVsPlay(savedFen) {
  const chessboardRef = useRef();
  const gameInit = savedFen ? new Chess(savedFen) : new Chess();
  const [game, setGame] = useState(gameInit);
  const boardWidth = 400;

  function safeGameMutate(modify) {
    setGame((g) => {
      const update = { ...g };
      modify(update);
      return update;
    });
  }

  // useEffect(() => {
  //   client.onopen = () => {
  //     console.log("WebSocket Client Connected");
  //   };
  //   client.onmessage = (message) => {
  //     console.log(message);
  //   };
  // });

  function onDrop(sourceSquare, targetSquare) {
    const gameCopy = { ...game };
    const move = gameCopy.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q", // always promote to a queen for example simplicity
    });
    setGame(gameCopy);
    return move;
  }

  return (
    <div className="play">
      <Chessboard
        id="PlayVsPlay"
        animationDuration={200}
        boardWidth={boardWidth}
        position={game.fen()}
        onPieceDrop={onDrop}
        customBoardStyle={{
          borderRadius: "4px",
          boxShadow: "0 5px 15px rgba(0, 0, 0, 0.5)",
        }}
        ref={chessboardRef}
      />
      <button
        className="rc-button"
        onClick={() => {
          safeGameMutate((game) => {
            game.reset();
          });
          chessboardRef.current.clearPremoves();
        }}
      >
        reset
      </button>
      <button
        className="rc-button"
        onClick={() => {
          safeGameMutate((game) => {
            game.undo();
          });
          chessboardRef.current.clearPremoves();
        }}
      >
        undo
      </button>
    </div>
  );
}
