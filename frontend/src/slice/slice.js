import { createSlice } from "@reduxjs/toolkit";

/* File that initializes actions and corresponding reducer logic */

const initialState = {
  data: [],
  errors: "",
  inputDictionary: {},
  isLoading: false,
};

export const slice = createSlice({
  name: "slice",
  initialState: initialState,
  reducers: {
    makeCalculation: (state) => {
      // Triggers saga API call to backend
      state.errors = "";
      state.isLoading = true;
    },
    makeCalculationSuccess: (state, { payload: data }) => {
      // Returns successful calculations
      state.data = data;
      state.isLoading = false;
    },
    makeCalculationFailure: (state, { payload }) => {
      // Returns unsuccessful calculations
      state.errors = payload;
      state.data = [];
      state.isLoading = false;
    },
    updateInputs: (state, { payload: { key, value } }) => {
      // Updates dictionary that has input keys (ie: x, sigma, beta, etc) and corresponding values
      state.inputDictionary[key] = value;
    },
  },
});

export const {
  makeCalculation,
  makeCalculationSuccess,
  makeCalculationFailure,
  updateInputs,
} = slice.actions;

export default slice.reducer;
