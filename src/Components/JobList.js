import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import JobFilters from './JobFilters';
import JobListContent from './JobListContent';
import { createTheme, ThemeProvider } from '@mui/material';

const theme = createTheme({
  typography: {
    fontFamily: '"Lexend", serif',
  },
});

function JobList() {
  const [uniqueJobs, setUniqueJobs] = useState([]);
  const { jobs, error } = useSelector(state => state.job);
  const [filters, setFilters] = useState({
    minExperience: [],
    locationFilter: '',
    jobRole: [],
    minBasePay: '',
    companyName: ''
  });

  useEffect(() => {
    const uniqueJobMap = new Map();
    jobs.forEach(job => {
      if (!uniqueJobMap.has(job.jdUid)) {
        uniqueJobMap.set(job.jdUid, job);
      }
    });
    setUniqueJobs(Array.from(uniqueJobMap.values()));
  }, [jobs]);

  const filteredJobs = uniqueJobs.filter(job => {
    const meetsMinExperience = filters.minExperience.length === 0 || filters.minExperience.some(exp => job.minExp <= parseInt(exp) && job.maxExp >= parseInt(exp));
    const matchesJobRole = filters.jobRole.length === 0 || filters.jobRole.includes(job.jobRole);

    return (
      (!filters.locationFilter || job.location === filters.locationFilter || filters.locationFilter === 'In-Office') &&
      meetsMinExperience &&
      matchesJobRole &&
      (!filters.minBasePay || (job.minJdSalary >= parseInt(filters.minBasePay))) &&
      (!filters.companyName || job.companyName.toLowerCase().includes(filters.companyName.toLowerCase()))
    );
  });

  return (
    <ThemeProvider theme={theme}>
        <JobFilters filters={filters} setFilters={setFilters} />
        <JobListContent error={error} filteredJobs={filteredJobs} />
    </ThemeProvider>
  );
}

export default JobList;
