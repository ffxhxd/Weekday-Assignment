import React from 'react';
import JobCard from './JobCard';
import Shimmer from './Shimmer';

function JobListContent({ loading, error, filteredJobs }) {

    if (loading) {
        return (
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem' }}>
            {/* Render multiple shimmers for visual effect */}
            {Array.from({ length: 6 }, (_, i) => <Shimmer key={i} />)}
          </div>
        );
      }

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center',alignItems:'center', gap: '1rem' }}>
      {filteredJobs.map(job => (
        <JobCard key={job.jdUid} job={job} />
      ))}
      <div id="scroll-sentinel" style={{ width: '100%', height: '1px' }}></div>
      {error && <p>Error: {error}</p>}
    </div>
  );
}

export default JobListContent;
