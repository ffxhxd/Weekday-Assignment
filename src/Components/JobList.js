import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import useJobData from '../Hooks/useJobData';
import JobFilters from './JobFilters';
import JobListContent from './JobListContent';
import { createTheme, ThemeProvider } from '@mui/material';

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
    minExperience: [],
    locationFilter: '',
    jobRole: [],
    minBasePay: '',
    companyName: ''
  });

  useJobData(offset);

  useEffect(() => {
    let debounceTimeout;
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !loading) {
        debounceTimeout = setTimeout(() => {
          setLoading(true);
          setOffset(prev => prev + 1);
        }, 100);
      }
    }, {
      threshold: 0.5
    });
  
    const sentinel = document.getElementById('scroll-sentinel');
    if (sentinel) {
      observer.observe(sentinel);
    }
  
    return () => {
      if (debounceTimeout) clearTimeout(debounceTimeout);
      if (sentinel) observer.unobserve(sentinel);
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
        <JobListContent loading={loading} error={error} filteredJobs={filteredJobs} />
    </ThemeProvider>
  );
}

export default JobList;
