// import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import useJobData from './Hooks/useJobData';

// function JobList() {
//   const [offset, setOffset] = useState(0);
//   const [locationFilter, setLocationFilter] = useState('All');
//   const [roleFilter, setRoleFilter] = useState('All');
//   const [experienceFilter, setExperienceFilter] = useState('All');
//   const [salaryFilter, setSalaryFilter] = useState('0');  // Default to the lowest bracket, indicating no filter
//   const [uniqueJobs, setUniqueJobs] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const { jobs, error } = useSelector(state => state.job);
//   useJobData(offset);

//   // Handle loading more jobs on scroll
//   const handleInfiniteScroll = () => {
//     try {
//       if (
//         window.innerHeight + document.documentElement.scrollTop + 1 >=
//         document.documentElement.scrollHeight
//       ) {
//         setLoading(true);
//         setOffset(prev => prev + 1);
//       }
//     } catch (error) {
//       console.error("Error handling infinite scroll:", error);
//     }
//   };

//   useEffect(() => {
//     window.addEventListener("scroll", handleInfiniteScroll);
//     return () => window.removeEventListener("scroll", handleInfiniteScroll);
//   }, []);

//   useEffect(() => {
//     const uniqueJobMap = new Map();
//     jobs.forEach(job => {
//       if (!uniqueJobMap.has(job.jdUid)) {
//         uniqueJobMap.set(job.jdUid, job);
//       }
//     });
//     setUniqueJobs(Array.from(uniqueJobMap.values()));
//     setLoading(false);
//   }, [jobs]);

//   const handleLocationChange = (event) => {
//     setLocationFilter(event.target.value);
//   };

//   const handleRoleChange = (event) => {
//     setRoleFilter(event.target.value);
//   };

//   const handleExperienceChange = (event) => {
//     setExperienceFilter(event.target.value);
//   };

//   const handleSalaryChange = (event) => {
//     setSalaryFilter(event.target.value);
//   };

//   const filteredJobs = uniqueJobs.filter(job => {
//     return (locationFilter === 'All' || job.location === locationFilter) &&
//            (roleFilter === 'All' || job.jobRole.toLowerCase().includes(roleFilter.toLowerCase())) &&
//            (experienceFilter === 'All' || (job.minExp <= parseInt(experienceFilter) && job.maxExp >= parseInt(experienceFilter))) &&
//            (salaryFilter === '0' || job.minJdSalary >= parseInt(salaryFilter) * 1000);
//   });

//   return (
//     <>
//       <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
//         <select style={{ margin: '20px', padding: '10px' }} onChange={handleLocationChange}>
//           <option value="All">All Locations</option>
//           <option value="remote">Remote</option>
//           <option value="hybrid">Hybrid</option>
//         </select>
//         <select style={{ margin: '20px', padding: '10px' }} onChange={handleRoleChange}>
//           <option value="All">All Roles</option>
//           <option value="frontend">Frontend</option>
//           <option value="backend">Backend</option>
//           <option value="tech lead">Tech Lead</option>
//         </select>
//         <select style={{ margin: '20px', padding: '10px' }} onChange={handleExperienceChange}>
//           <option value="All">Any Experience</option>
//           {Array.from({ length: 10 }, (_, i) => i + 1).map(exp => (
//             <option key={exp} value={exp}>{exp} years</option>
//           ))}
//         </select>
//         <select style={{ margin: '20px', padding: '10px' }} onChange={handleSalaryChange}>
//           <option value="0">Any Salary</option>
//           {Array.from({ length: 8 }, (_, i) => (i + 1) * 10).map(value => (
//             <option key={value} value={value}>${value}k</option>
//           ))}
//         </select>
//       </div>
//       <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
//         {filteredJobs.map(job => (
//           <div key={job.jdUid} style={{
//             display: 'flex',
//             backgroundColor: '#f1f1f1',
//             padding: '20px',
//             margin: '10px 0',
//             borderRadius: '8px',
//             boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
//             width: '350px',
//             height: '250px'
//           }}>
//             <img src={job.logoUrl || 'https://via.placeholder.com/150'} alt={`${job.companyName} Logo`} style={{ width: '150px', height: '150px', marginRight: '20px' }} />
//             <div>
//               <h3>{job.jobRole} at {job.companyName}</h3>
//               <p><strong>Location:</strong> {job.location}</p>
//               <p><strong>Experience Required:</strong> {job.minExp} - {job.maxExp} years</p>
//               <p><strong>Salary:</strong> ${job.minJdSalary}k - ${job.maxJdSalary}k {job.salaryCurrencyCode}</p>
//               <a href={job.jdLink} target="_blank" style={{ color: 'blue', textDecoration: 'none' }}>Learn more</a>
//             </div>
//           </div>
//         ))}
//         {loading && <p>Loading jobs...</p>}
//         {error && <p>Error: {error}</p>}
//       </div>
//     </>
//   );
// }

// export default JobList;

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import useJobData from './Hooks/useJobData';
import JobCard from './Components/JobCard';  // Import the JobCard component
import { createTheme, ThemeProvider } from '@mui/material/styles';


const theme = createTheme({
  typography: {
    fontFamily: '"Lexend", serif',
  }
});

function JobList() {
  const [offset, setOffset] = useState(0);
  const [locationFilter, setLocationFilter] = useState('All');
  const [roleFilter, setRoleFilter] = useState('All');
  const [experienceFilter, setExperienceFilter] = useState('All');
  const [salaryFilter, setSalaryFilter] = useState('0');  // Default to the lowest bracket, indicating no filter
  const [uniqueJobs, setUniqueJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  const { jobs, error } = useSelector(state => state.job);
  useJobData(offset);

  // Handle loading more jobs on scroll
  const handleInfiniteScroll = () => {
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        setLoading(true);
        setOffset(prev => prev + 1);
      }
    } catch (error) {
      console.error("Error handling infinite scroll:", error);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleInfiniteScroll);
    return () => window.removeEventListener("scroll", handleInfiniteScroll);
  }, []);

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



  const handleLocationChange = (event) => {
    setLocationFilter(event.target.value);
  };

  const handleRoleChange = (event) => {
    setRoleFilter(event.target.value);
  };

  const handleExperienceChange = (event) => {
    setExperienceFilter(event.target.value);
  };

  const handleSalaryChange = (event) => {
    setSalaryFilter(event.target.value);
  };

  const filteredJobs = uniqueJobs.filter(job => {
    return (locationFilter === 'All' || job.location === locationFilter) &&
           (roleFilter === 'All' || job.jobRole.toLowerCase().includes(roleFilter.toLowerCase())) &&
           (experienceFilter === 'All' || (job.minExp <= parseInt(experienceFilter) && job.maxExp >= parseInt(experienceFilter))) &&
           (salaryFilter === '0' || job.minJdSalary >= parseInt(salaryFilter) * 1000);
  });
  

  return (
    <ThemeProvider theme={theme}>

  <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
         <select style={{ margin: '20px', padding: '10px' }} onChange={handleLocationChange}>
           <option value="All">All Locations</option>
           <option value="remote">Remote</option>
          <option value="hybrid">Hybrid</option>
         </select>
         <select style={{ margin: '20px', padding: '10px' }} onChange={handleRoleChange}>
           <option value="All">All Roles</option>
           <option value="frontend">Frontend</option>
           <option value="backend">Backend</option>
           <option value="tech lead">Tech Lead</option>
         </select>
         <select style={{ margin: '20px', padding: '10px' }} onChange={handleExperienceChange}>
           <option value="All">Any Experience</option>
           {Array.from({ length: 10 }, (_, i) => i + 1).map(exp => (
             <option key={exp} value={exp}>{exp} years</option>
           ))}
         </select>
         <select style={{ margin: '20px', padding: '10px' }} onChange={handleSalaryChange}>
           <option value="0">Any Salary</option>
           {Array.from({ length: 8 }, (_, i) => (i + 1) * 10).map(value => (
             <option key={value} value={value}>${value}k</option>
           ))}
        </select>
               </div>

      {/* Filters here */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
        {filteredJobs.map(job => (
          <JobCard key={job.jdUid} job={job} />  // Use JobCard for each job
        ))}
        {loading && <p>Loading jobs...</p>}
        {error && <p>Error: {error}</p>}
      </div>
      </ThemeProvider>
  );
}

export default JobList;
