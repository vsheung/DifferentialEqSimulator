import { runSaga } from "redux-saga";
import axios from "axios";
import rootSaga, { makeCalculationSaga } from "../saga/saga";
import { makeCalculationFailure, makeCalculationSuccess } from "../slice/slice";
import { takeLatest } from "redux-saga/effects";

/* Unit test file for testing saga functionality */

jest.mock("axios");

describe("MakeCalculationSaga", () => {
  const fakeInputDictionary = {
    x: 1,
    y: 1,
    z: 1,
    sigma: 1,
    beta: 1,
    rho: 1,
    delta: 1,
  };

  it("Should handle successful calculation", async () => {
    const mockResponseData = { data: [{ n: 1, x: 1, y: 1, z: 1 }] };
    axios.get.mockResolvedValueOnce({ data: mockResponseData });

    const dispatched = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
        getState: () => ({ reducer: { inputDictionary: fakeInputDictionary } }),
      },
      makeCalculationSaga
    ).toPromise();

    expect(axios.get).toHaveBeenCalled; // Expect axios call to backend
    expect(dispatched).toEqual([makeCalculationSuccess(mockResponseData)]); // Expect dispatched action to be makeCalculationSuccess
  });

  it("Should handle failed calculation", async () => {
    const fakeError = new Error("Some error message");
    axios.get.mockRejectedValueOnce(fakeError);

    const dispatched = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
        getState: () => ({ reducer: { inputDictionary: fakeInputDictionary } }),
      },
      makeCalculationSaga
    ).toPromise();

    expect(axios.get).toHaveBeenCalled(); // Expect axios call to backend
    expect(dispatched).toEqual([makeCalculationFailure(fakeError.message)]); // Expect dispatched action to be makeCalculationFailure
  });
});

describe("RootSaga", () => {
  it("Should not handle makeCalculation when no action is dispatched ", async () => {
    const dispatchedActions = [];

    const mockMakeCalculationSaga = jest
      .fn()
      .mockImplementation(() => ({ type: "calledMockMakeCalculationSaga" }));

    runSaga(
      {
        dispatch: (action) => dispatchedActions.push(action),
      },
      rootSaga
    ).toPromise();

    expect(dispatchedActions).toEqual([]); // Does not have dispatched actions since takeLastest is listening to action
    expect(mockMakeCalculationSaga).not.toHaveBeenCalled();
  });
});
