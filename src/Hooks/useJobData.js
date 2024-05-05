import { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ALL_JOBS_API } from "../Utils/constants";
import { fetchJobsStart, fetchJobsSuccess, fetchJobsFailure } from "../Utils/Redux/jobSlice";

const useJobData = (offset) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const jobs = useSelector((state) => state.jobs);

  const fetchData = useCallback(async () => {
    dispatch(fetchJobsStart());
    setLoading(true);

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const body = JSON.stringify({
      "limit": 9,
      "offset": offset 
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body
    };

    try {
        const response = await fetch(ALL_JOBS_API, requestOptions);
        const result = await response.json();
        dispatch(fetchJobsSuccess(result));
    } catch (error) {
        dispatch(fetchJobsFailure('Failed to fetch jobs'));
    } finally {
        setLoading(false);
    }
}, [dispatch, offset]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { jobs, loading };
};

export default useJobData;
