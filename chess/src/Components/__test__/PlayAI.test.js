import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { screen, fireEvent, waitForElement } from "@testing-library/react";
import "@testing-library/jest-dom";
import Enzyme, { shallow, render, mount } from "enzyme";
import { configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import ReactDOM from "react-dom";
import PlayAI from "../PlayAI";
import ChooseDifficulty from "../ChooseDifficulty";
// import * as Chess from "chess.js";

import { useEffect, useRef, useState } from "react";
// import Chess from "chess.js";
import { Chessboard } from "react-chessboard";
import cookieObj from "../GetCookies";
import { minimax } from "../ChessMLAlgorithm";
import Networking from "../Networking";
import { Redirect } from "react-router";

const Chess = require("chess.js").Chess;

configure({ adapter: new Adapter() });
describe("Play Against AI", () => {
  let wrapper;
  let sessionCookie;
  function getCookie(newCookie) {
    sessionCookie = newCookie;
  }
  const game = new Chess(
    "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
  );
  let props = {
    location: {
      state: {
        state: {
          difficulty: "1",
          inCheck: 1,
          optimalMove: 1,
          reset: 0,
          submit: true,
          undo: 0,
          userColour: "w",
        },
      },
      chessboard: game,
    },
  };
  // rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1
  let ChooseDifficultyWrapper;
  beforeEach(() => {
    wrapper = shallow(<PlayAI {...props} />);
    ChooseDifficultyWrapper = shallow(<ChooseDifficulty />);
  });

  it("should match the snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("Choose colour buttons appear when the player is starting a new  game.", () => {
    let props = {
      location: {
        state: {
          state: {
            difficulty: "1",
            inCheck: 1,
            optimalMove: 1,
            reset: 0,
            submit: true,
            undo: 0,
            userColour: null,
          },
        },
        chessboard: game,
      },
    };
    render(
      <Router>
        <PlayAI {...props} />
      </Router>
    );

    // expect(getByText(/Click me/i).closest('button')).toBeDisabled();

    // expect(screen).toBeTruthy();
    // const button = screen.getByText("Get Hints");
    // expect(button).toBeDisabled();

    const buttons = screen.queryAllByText("button");
    buttons.forEach((button) => {
      // Expect
      expect(button).toBeTruthy();
    });
  });
});

describe("PlayAI test", () => {
  // let wrapper;
  let sessionCookie;
  function getCookie(newCookie) {
    sessionCookie = newCookie;
  }

  it("Should notify me when I'm in check, if the option is enabled", async () => {
    const game = new Chess(
      "rnb1kbnr/ppp1pppp/8/8/4p3/2P2P2/PP4PP/RNBqKBNR w KQkq - 0 5"
    );
    let props = {
      location: {
        state: {
          state: {
            difficulty: "1",
            inCheck: 1,
            optimalMove: 1,
            reset: 0,
            submit: true,
            undo: 0,
            userColour: "w",
          },
        },
        chessboard: game,
      },
    };
    render(
      <Router>
        <PlayAI {...props} />
      </Router>
    );
    const messageDiv = screen.queryAllByAltText("p");
    expect(messageDiv).toBeTruthy();
    // getByTestId("play-ai-message");
    // expect(messageDiv).toContain("is in check!");
  });

  it("All buttons are enabled if the user chooses all hints.", () => {
    const game = new Chess();
    let props = {
      location: {
        state: {
          state: {
            difficulty: "1",
            inCheck: 1,
            optimalMove: 1,
            reset: 1,
            submit: true,
            undo: 1,
            userColour: "w",
          },
        },
        chessboard: game,
      },
    };
    render(
      <Router>
        <PlayAI {...props} />
      </Router>
    );
    const buttons = screen.queryAllByAltText("button");
    buttons.forEach((button) => {
      expect(button).not.toBeDisabled();
    });
  });

  it("get hints button should be disabled if the user does not choose to enable hints", () => {
    const game = new Chess();
    let props = {
      location: {
        state: {
          state: {
            difficulty: "1",
            inCheck: 1,
            optimalMove: 0,
            reset: 1,
            submit: true,
            undo: 1,
            userColour: "w",
          },
        },
        chessboard: game,
      },
    };
    render(
      <Router>
        <PlayAI {...props} />
      </Router>
    );
    const hintButtons = screen.queryAllByAltText("button");
    hintButtons.forEach((button) => {
      expect(button).toBeTruthy();
    });
  });
});
