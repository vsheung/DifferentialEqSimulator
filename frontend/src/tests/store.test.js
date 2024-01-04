import { configureStore } from "@reduxjs/toolkit";
import rootReducers from "../rootReducer/rootReducer";
import createSagaMiddleware from "@redux-saga/core";
import { makeCalculation, updateInputs } from "../slice/slice";
import rootSaga from "../saga/saga";

/* Unit test file for configuring app store */

describe("Store Configuration", () => {
  let store;
  let sagaMiddleware;

  beforeAll(() => {
    sagaMiddleware = createSagaMiddleware();
    store = configureStore({
      reducer: rootReducers,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(sagaMiddleware),
    });
    sagaMiddleware.run(rootSaga);
  });

  it("Should have the correct initial state", () => {
    const { reducer } = store.getState();
    const { data, errors, isLoading, inputDictionary } = reducer;

    expect(data).toEqual([]);
    expect(errors).toEqual("");
    expect(isLoading).toEqual(false);
    expect(inputDictionary).toEqual({});
  });

  it("Should dispatch actions successfully, triggering saga middleware", () => {
    store.dispatch(updateInputs({ key: "beta", value: 2 }));
    store.dispatch(makeCalculation());

    const { reducer } = store.getState();
    const { data, errors, isLoading, inputDictionary } = reducer;

    expect(data).toEqual([]);
    expect(errors).toEqual("Missing input fields");
    expect(isLoading).toEqual(false);
    expect(inputDictionary).toEqual({ beta: 2 });
  });
});
