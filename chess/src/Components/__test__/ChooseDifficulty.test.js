import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import ChooseDifficulty from "../ChooseDifficulty";

describe("ChooseDifficulty", () => {
  test("Choose Difficulty page contains checkbox to choose to play an easy game", async () => {
    render(
      <BrowserRouter>
        <ChooseDifficulty />
      </BrowserRouter>
    );

    const checkboxes = screen.queryAllByText("checkbox");
    checkboxes.forEach((checkbox) => {
      fireEvent.click(checkbox);

      // Expect
      expect(checkbox).toHaveStyle({ backgroundColor: "blue" });
    });
  });
});
