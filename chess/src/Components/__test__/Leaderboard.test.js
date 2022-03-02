import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import Leaderboard from "../Leaderboard";

describe("Leaderboard", () => {
  test("Leaderboard has a title", () => {
    render(
      <BrowserRouter>
        <Leaderboard />
      </BrowserRouter>
    );
    const text = screen.getByText("Leaderboard");
    expect(text).toBeInTheDocument();
  });
  test("History page is rendered with a table", () => {
    render(
      <BrowserRouter>
        <Leaderboard />
      </BrowserRouter>
    );
    const table = screen.getByRole("table");
    expect(table).toBeInTheDocument();
  });
});
