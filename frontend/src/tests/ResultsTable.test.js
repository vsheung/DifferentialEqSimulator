import { act } from "react-dom/test-utils";
import React from "react";
import { render } from "@testing-library/react";
import { Provider, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import ResultsTable from "../components/ResultsTable/ResultsTable";
import rootReducers from "../rootReducer/rootReducer";

/* Test file for React Results Table file */

// Mocking react-redux
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
}));

const initialState = {
  data: [],
  errors: "",
  inputDictionary: {},
  isLoading: false,
};

describe("ResultsTable", () => {
  let mockDispatch;

  const mockStore = configureStore({ reducer: rootReducers });

  beforeEach(() => {
    useSelector.mockReturnValue(initialState);
  });

  it("should render table with data from the store", () => {
    const DATA_CELLS_POPULATED = 8;
    const data = [
      { n: 1, x: 10, y: 20, z: 30 },
      { n: 2, x: 15, y: 25, z: 35 },
    ];

    // Mock the useSelector to return the data
    useSelector.mockReturnValue({ data });

    act(() => {
      render(
        <Provider store={mockStore}>
          <ResultsTable />
        </Provider>
      );
    });

    expect(document.querySelector("table")).toBeTruthy(); // Expect header and table to be rendered
    expect(document.querySelector("th")).toBeTruthy();
    expect(document.querySelectorAll("td").length).toEqual(
      DATA_CELLS_POPULATED
    ); // 8 Cells should be populated data
  });

  it("should render table with empty data", () => {
    useSelector.mockReturnValue({ data: [] });

    act(() => {
      render(
        <Provider store={mockStore}>
          <ResultsTable />
        </Provider>
      );
    });

    expect(document.querySelector("table")).toBeTruthy(); // Expect header and table to be rendered
    expect(document.querySelector("th")).toBeTruthy();
    expect(document.querySelector("td")).toEqual(null); // SHould be no populated cells
  });
});
