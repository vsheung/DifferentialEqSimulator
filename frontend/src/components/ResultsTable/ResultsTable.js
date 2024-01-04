import React from "react";
import { useSelector } from "react-redux";

/**
 * Returns component that contains calculated results
 * @return {ReactNode}
 */

const ResultsTable = () => {
  const { data } = useSelector((state) => state.reducer);
  return (
    <table className="border border-dark d-flex flex-column mt-3 mb-3 ms-3 me-3 rounded">
      <thead className="w-100 bg-secondary rounded-top">
        <tr>
          <th className="text-white ps-2">Results</th>
        </tr>
      </thead>
      <tbody className="me-5">
        <table className="table border border-dark mt-3 mb-3 ms-4 me-5 w-100">
          <thead>
            <tr data-testid={`row-header`}>
              <th>N</th>
              <th>X</th>
              <th>Y</th>
              <th>Z</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index} data-testid={`row-${index}`}>
                <td>{row.n}</td>
                <td>{row.x}</td>
                <td>{row.y}</td>
                <td>{row.z}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </tbody>
    </table>
  );
};

export default ResultsTable;
