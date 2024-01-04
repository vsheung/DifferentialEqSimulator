import React from "react";
import { act } from "react-dom/test-utils";
import { useDispatch } from "react-redux";
import Header from "../components/Header/Header";
import { makeCalculation } from "../slice/slice";
import { render } from "@testing-library/react";

/* Test file for React Header file */

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
}));

describe("Header", () => {
  let container;
  let mockDispatch;

  beforeAll(() => {
    mockDispatch = jest.fn();
  });

  beforeEach(() => {
    useDispatch.mockReturnValue(mockDispatch);
    act(() => {
      container = document.createElement("div");
      document.body.appendChild(container);
      render(<Header />);
    });
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  it("renders Header component with correct content", () => {
    const headerText = document.querySelector("h6");
    const runButton = document.querySelector("button");

    expect(headerText.textContent).toBe("AI Labs | Full Stack Case Study");
    expect(runButton.textContent).toBe("Run");
  });

  it("dispatches makeCalculation action on button click", () => {
    const runButton = document.querySelector("button");
    act(() => {
      runButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(mockDispatch).toHaveBeenCalledWith(makeCalculation());
  });
});
