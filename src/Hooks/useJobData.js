import { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { ALL_JOBS_API } from "../Utils/constants";
import { fetchJobsStart, fetchJobsSuccess, fetchJobsFailure } from "../Utils/Redux/jobSlice";

const useJobData = (offset) => {
    console.log("hook is running")
  const dispatch = useDispatch();

  const fetchData = useCallback(async () => {
    console.log('Dispatching fetchJobsStart');
    dispatch(fetchJobsStart());

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const body = JSON.stringify({
      "limit": 10,
      "offset": offset  // Use the offset passed to the hook
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body
    };

    try {
        console.log('Making API call', ALL_JOBS_API, requestOptions);
        const response = await fetch(ALL_JOBS_API, requestOptions);
        const result = await response.json();
        console.log('API call success', result);
        dispatch(fetchJobsSuccess(result));
    } catch (error) {
        console.log('API call failed', error);
        dispatch(fetchJobsFailure('Failed to fetch jobs'));
    }
}, [dispatch, offset]);


  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return null; // This hook does not need to return anything
};

export default useJobData;