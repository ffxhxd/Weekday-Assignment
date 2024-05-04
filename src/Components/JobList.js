import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import useJobData from '../Hooks/useJobData';
import JobFilters from './JobFilters';
import JobListContent from './JobListContent';
import { createTheme, ThemeProvider, Box } from '@mui/material';

const theme = createTheme({
  typography: {
    fontFamily: '"Lexend", serif',
  },
});

function JobList() {
  const [offset, setOffset] = useState(0);
  const [uniqueJobs, setUniqueJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const { jobs, error } = useSelector(state => state.job);
  const [filters, setFilters] = useState({
    minExperience: '',
    locationFilter: '',
    jobRole: '',
    minBasePay: '',
    companyName: ''
  });

  useJobData(offset);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !loading) {
        setLoading(true);
        setOffset(prev => prev + 1);
      }
    }, {
      threshold: 1.0
    });

    const sentinel = document.getElementById('scroll-sentinel');
    if (sentinel) {
      observer.observe(sentinel);
    }

    return () => {
      if (sentinel) {
        observer.unobserve(sentinel);
      }
    };
  }, [loading]);

  useEffect(() => {
    const uniqueJobMap = new Map();
    jobs.forEach(job => {
      if (!uniqueJobMap.has(job.jdUid)) {
        uniqueJobMap.set(job.jdUid, job);
      }
    });
    setUniqueJobs(Array.from(uniqueJobMap.values()));
    setLoading(false);
  }, [jobs]);

  const filteredJobs = uniqueJobs.filter(job => (
    (!filters.locationFilter || job.location === filters.locationFilter || filters.locationFilter === 'In-Office') &&
    (!filters.minExperience || (filters.minExperience && job.minExp <= parseInt(filters.minExperience) && job.maxExp >= parseInt(filters.minExperience))) &&
    (!filters.jobRole || job.jobRole === filters.jobRole) &&
    (!filters.minBasePay || (job.minJdSalary >= parseInt(filters.minBasePay))) &&
    (!filters.companyName || job.companyName.toLowerCase().includes(filters.companyName.toLowerCase()))
  ));

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: "center", gap: 2, p: 2 }}>
        <JobFilters filters={filters} setFilters={setFilters} />
      </Box>
      <JobListContent loading={loading} error={error} filteredJobs={filteredJobs} />
    </ThemeProvider>
  );
}

export default JobList;
