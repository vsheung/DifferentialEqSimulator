import React from "react";
import { useDispatch } from "react-redux";
import { makeCalculation } from "../../slice/slice";

/**
 * Header Component that contains Run button
 * @return {ReactNode}
 */

const Header = () => {
  const dispatch = useDispatch();

  const onRunHandler = () => {
    dispatch(makeCalculation());
  };

  return (
    <>
      <header className="d-flex flex-row justify-content-between mt-3 mb-3 ms-3 me-4">
        <h6 className="my-auto">AI Labs | Full Stack Case Study</h6>
        <button type="button" className="btn btn-info" onClick={onRunHandler}>
          Run
        </button>
      </header>
      <hr />
    </>
  );
};

export default Header;
