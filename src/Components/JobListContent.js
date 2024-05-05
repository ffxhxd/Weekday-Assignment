import React from 'react';
import JobCard from './JobCard';
import Shimmer from './Shimmer';
import './Styles/JobListContent.css'

function JobListContent({ loading, error, filteredJobs }) {

    if (loading) {
        return (
          <div className='shimmer-container'>
            {Array.from({ length: 6 }, (_, i) => <Shimmer key={i} />)}
          </div>
        );
      }

  return (
    <div className="grid-container">
    {filteredJobs.map(job => (
      <JobCard key={job.jdUid} job={job} />
    ))}
    <div id="scroll-sentinel"></div>
    {error && <p>Error: {error}</p>}
  </div>
  
  );
}

export default JobListContent;
