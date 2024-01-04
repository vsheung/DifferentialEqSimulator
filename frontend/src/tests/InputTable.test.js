import React from "react";
import { act } from "react-dom/test-utils";
import { render, fireEvent } from "@testing-library/react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { updateInputs } from "../slice/slice";
import InputTable from "../components/InputTable/InputTable";
import { configureStore } from "@reduxjs/toolkit";
import rootReducers from "../rootReducer/rootReducer";

/* Test file for React Input Table file */

// Mocking react-redux
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe("InputTable", () => {
  let mockDispatch;

  const initialState = {
    data: [],
    errors: "",
    inputDictionary: {},
    isLoading: false,
  };

  const mockStore = configureStore({ reducer: rootReducers });

  beforeAll(() => {
    mockDispatch = jest.fn();
  });

  beforeEach(() => {
    useDispatch.mockReturnValue(mockDispatch);
    useSelector.mockReturnValue(initialState);
  });

  it("renders InputTable component with correct content", () => {
    act(() => {
      render(
        <Provider store={mockStore}>
          <InputTable />
        </Provider>
      );
    });
    expect(document.querySelector("th").textContent).toBe("Input"); // Making sure there is a proper header
    expect(document.querySelector("input")).toBeInTheDocument(); // Making sure there are input boxes
  });

  it("dispatches updateInputs action on input change", async () => {
    useSelector.mockReturnValue(initialState);
    act(() => {
      render(
        <Provider store={mockStore}>
          <InputTable />
        </Provider>
      );
    });
    const valueInput = document.querySelector("input"); // First input box is for initial x coordinate
    act(() => {
      fireEvent.change(valueInput, { target: { value: 3 } }); // Firing onChange event
    });

    expect(mockDispatch).toHaveBeenCalled(); // Expect action to be dispatched
    expect(mockDispatch).toHaveBeenCalledWith(
      updateInputs({ key: "x", value: "3" })
    ); // Expect dispatched action to be updateInputs
  });

  it("renders error message when errors exist", () => {
    useSelector.mockReturnValue({
      errors: "Some error message",
      data: [],
      isLoading: false,
    });
    act(() => {
      render(
        <Provider store={mockStore}>
          <InputTable />
        </Provider>
      );
    });

    expect(document.querySelector(".bg-danger")).toBeInTheDocument(); // Expect error message to be rendered
    expect(document.querySelector(".bg-danger").textContent).toBe(
      "Error message: Some error message"
    );
  });

  it("renders success message when data exists", () => {
    // Assuming that data is returned
    const mockData = [{ data: "test" }];
    useSelector.mockReturnValue({
      errors: "",
      data: mockData,
      isLoading: false,
    });
    act(() => {
      render(
        <Provider store={mockStore}>
          <InputTable />
        </Provider>
      );
    });

    expect(document.querySelector(".bg-success")).toBeInTheDocument(); // Expect success message to be rendered
    expect(document.querySelector(".bg-success").textContent).toBe(
      "Successfully Obtained Calculations"
    );
  });
});
