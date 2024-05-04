import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name: "job",
    initialState: {
      jobs: [],
      loading: false,
      error: null,
      totalCount: 0,
    },
    reducers: {
      fetchJobsStart(state) {
        state.loading = true;
      },
      fetchJobsSuccess(state, action) {
        state.jobs = [...state.jobs, ...action.payload.jdList]; // Append new jobs from the fetched page
        state.totalCount = action.payload.totalCount; // Update the total count
        state.loading = false;
      },
      fetchJobsFailure(state, action) {
        state.error = action.payload;
        state.loading = false;
      },
    },
  });
  
export const { fetchJobsStart, fetchJobsSuccess, fetchJobsFailure } = jobSlice.actions;
export default jobSlice.reducer;
