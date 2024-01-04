import React from "react";
import { act } from "react-dom/test-utils";
import { render } from "@testing-library/react";
import App from "../App";

/* Test file for React Top Level App File */

const HEADER_COMPONENT_TEXT = "Header Component";
const INPUTTABLE_COMPONENT_TEXT = "InputTable Component";
const RESULTTABLE_COMPONENT_TEXT = "ResultTable Component";

jest.mock("../components/Header/Header", () => () => (
  <div data-testid="header">{HEADER_COMPONENT_TEXT}</div>
));

jest.mock("../components/InputTable/InputTable", () => () => (
  <div data-testid="input-table">{INPUTTABLE_COMPONENT_TEXT}</div>
));

jest.mock("../components/ResultsTable/ResultsTable", () => () => (
  <div data-testid="results-table">{RESULTTABLE_COMPONENT_TEXT}</div>
));

describe("App", () => {
  test("renders App component with Header, InputTable, and ResultsTable", () => {
    act(() => {
      render(<App />);
    });

    const headerElement = document.querySelector('[data-testid="header"]');
    const inputTableElement = document.querySelector(
      '[data-testid="input-table"]'
    );
    const resultsTableElement = document.querySelector(
      '[data-testid="results-table"]'
    );

    expect(headerElement.textContent).toBe(HEADER_COMPONENT_TEXT); // Expect header to render
    expect(inputTableElement.textContent).toBe(INPUTTABLE_COMPONENT_TEXT); // Expect input table element to render
    expect(resultsTableElement.textContent).toBe(RESULTTABLE_COMPONENT_TEXT); // Expect results table element to render
  });
});
