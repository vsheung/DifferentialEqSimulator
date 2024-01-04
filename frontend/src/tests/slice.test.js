import mySliceReducer, {
  makeCalculation,
  makeCalculationFailure,
  makeCalculationSuccess,
  updateInputs,
} from "../slice/slice";
import MockAdapter from "axios-mock-adapter";

/* Unit test file for configuring app slice (defining reducer, actions) */

describe("Slice Reducer Verification", () => {
  let initialState;

  beforeAll(() => {
    initialState = {
      data: [],
      errors: "",
      inputDictionary: {
        x: 1,
        y: 1,
        z: 1,
        sigma: 1,
        beta: 1,
        rho: 1,
        delta: 1,
      },
      isLoading: false,
    };
  });

  it("Should handle makeCalculation action", () => {
    const nextState = mySliceReducer(initialState, makeCalculation());

    expect(nextState.errors).toEqual("");
    expect(nextState.isLoading).toEqual(true);
  });

  it("Should handle makeCalculationSuccess action", () => {
    const mockReturnedData = [{ n: 1, x: 2, y: 3, z: 4 }];
    const nextState = mySliceReducer(
      initialState,
      makeCalculationSuccess(mockReturnedData)
    );

    expect(nextState.data).toEqual(mockReturnedData);
    expect(nextState.isLoading).toEqual(false);
  });

  it("Should handle makeCalculationFailure action", () => {
    const mockErrorMessage = "Mock failure message";
    const nextState = mySliceReducer(
      initialState,
      makeCalculationFailure(mockErrorMessage)
    );

    expect(nextState.errors).toEqual(mockErrorMessage);
  });

  it("Should handle updateInputs action", () => {
    const nextState = mySliceReducer(
      initialState,
      updateInputs({ key: "rho", value: 20 })
    );
    expect(nextState.inputDictionary["rho"]).toEqual(20);
  });
});

describe("Slice Action Verification", () => {
  it("should create an action to makeCalculation", () => {
    expect(makeCalculation()).toEqual({ type: "slice/makeCalculation" });
  });

  it("should create an action to makeCalculationSuccess", () => {
    expect(makeCalculationSuccess([])).toEqual({
      type: "slice/makeCalculationSuccess",
      payload: [],
    });
  });

  it("should create an action to makeCalculationFailure", () => {
    expect(makeCalculationFailure("")).toEqual({
      type: "slice/makeCalculationFailure",
      payload: "",
    });
  });

  it("should create an action to updateInputs", () => {
    expect(updateInputs({ key: "rho", value: 1 })).toEqual({
      type: "slice/updateInputs",
      payload: { key: "rho", value: 1 },
    });
  });
});
