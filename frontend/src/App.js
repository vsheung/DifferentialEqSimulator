import React from "react";
import InputTable from "./components/InputTable/InputTable";
import Header from "./components/Header/Header";
import ResultsTable from "./components/ResultsTable/ResultsTable";

/**
 * Returns App Component
 * @return {ReactNode}
 */

export const App = () => {
  return (
    <>
      <Header />
      <InputTable />
      <ResultsTable />
    </>
  );
};

export default App;
