import axios from "axios";
import { put, takeLatest, select } from "redux-saga/effects";
import { makeCalculationSuccess, makeCalculationFailure } from "../slice/slice";

/* Generator function that makes API call to backend for calculations */

export function* makeCalculationSaga() {
  try {
    const state = yield select();
    const { inputDictionary } = state.reducer;
    if (!validateDictionaryInputs(inputDictionary)) {
      throw new Error("Missing input fields");
    }
    const response = yield axios.get(`http://localhost:3000/getResults`, {
      params: inputDictionary,
    });
    yield put(makeCalculationSuccess(response.data));
  } catch (error) {
    yield put(makeCalculationFailure(error.message));
  }
}

const rootSaga = function* () {
  yield takeLatest("slice/makeCalculation", makeCalculationSaga);
};

/* Helper for validating dictionary inputs */

const validateDictionaryInputs = (inputDictionary) => {
  for (const [, value] of Object.entries(inputDictionary)) {
    if (value === "") return false;
  }
  return Object.keys(inputDictionary).length === 7; // 7 Inputs need to be defined
};

export default rootSaga;
