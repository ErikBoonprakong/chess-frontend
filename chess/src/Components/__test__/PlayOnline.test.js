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
import { CircularProgress, ThemeProvider } from "@mui/material";
// import * as Chess from "chess.js";

import { useEffect, useRef, useState } from "react";
// import Chess from "chess.js";
import { Chessboard } from "react-chessboard";
import cookieObj from "../GetCookies";
import { minimax } from "../ChessMLAlgorithm";
import Networking from "../Networking";
import { Redirect } from "react-router";
import PlayOnline from "../PlayOnline";

const Chess = require("chess.js").Chess;

configure({ adapter: new Adapter() });

describe("Play Online tests", () => {
  it("Should render the chessboard when two players are in the room", () => {
    const props = {
      userData: { user: "c" },
      location: {
        state: {
          roomNumber: 0,
          roomName: "bathroom",
        },
      },
    };
    const wrapper = shallow(<PlayOnline {...props} />);
    // wrapper.setState({ players: ["a", "b"] });
    const chessboard = wrapper.find("Chessboard");
    expect(chessboard).toBeTruthy();
  });
});
