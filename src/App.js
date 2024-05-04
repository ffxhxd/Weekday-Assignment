import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import useJobData from './Hooks/useJobData';

function JobList() {
  const [offset, setOffset] = useState(0); 
  useJobData(offset);  // Use custom hook with the current offset

  const { jobs, loading, error } = useSelector(state => state.job);

  const loadMoreJobs = () => {
    setOffset(prevOffset => prevOffset + 1);  // Increase offset by 1
  };

  return (
    <div>
      {jobs.map(job => (
        <div key={job.jdUid}>
          <h3>{job.jobRole} at {job.companyName}</h3>
          <p>{job.jobDetailsFromCompany}</p>
        </div>
      ))}
      {loading && <p>Loading jobs...</p>}
      {error && <p>Error: {error}</p>}  // Display error if fetching fails
      <button onClick={loadMoreJobs}>Load More Jobs</button>  // Button to load more jobs
    </div>
  );
}

export default JobList;
