// InfiniteScrollJobList.js
import React, { useState, useEffect, useCallback } from 'react';
import JobList from './JobList';
import useJobData from '../Hooks/useJobData';
import Shimmer from './Shimmer';

const InfiniteScrollJobList = () => {
  const [offset, setOffset] = useState(0);
  const [isFetching, setIsFetching] = useState(false); // State to prevent redundant fetching
  const { jobs, loading } = useJobData(offset);

  const handleScroll = useCallback(() => {
    // Trigger new data fetch if the user is near the bottom and not currently fetching
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight &&
      !isFetching
    ) {
      setIsFetching(true);
      setOffset((prevOffset) => prevOffset + 1);
    }
  }, [isFetching]);

  // Reset the fetching state when loading is done
  useEffect(() => {
    if (!loading) {
      setIsFetching(false);
    }
  }, [loading]);

  // Register and cleanup scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <div>
      <JobList jobs={jobs} />
      {loading && <Shimmer />}
    </div>
  );
};

export default InfiniteScrollJobList;
