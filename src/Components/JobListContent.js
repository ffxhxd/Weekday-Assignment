import React from 'react';
import JobCard from './JobCard';
import './Styles/JobListContent.css';

function JobListContent({ filteredJobs }) {
  return (
    <div>

<div className="grid-container">
          {filteredJobs.map(job => (
            <JobCard key={job.jdUid} job={job} />
          ))}
          <div id="scroll-sentinel"></div>
        </div>
    </div>
  );
}

export default JobListContent;
