import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, Chip, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

function JobFilters({ filters, setFilters }) {
  const handleClearFilter = (filter) => {
    setFilters({ ...filters, [filter]: '' });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 2, padding: 2 }}>
      <FormControl variant="outlined" sx={{ m: 1, minWidth: 170 }}>
        <InputLabel>Min Experience</InputLabel>
        <Select
          value={filters.minExperience}
          onChange={(e) => setFilters({ ...filters, minExperience: e.target.value })}
          label="Min Experience"
          renderValue={(selected) => (
            <Chip
              onDelete={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleClearFilter('minExperience');
              }}
              deleteIcon={<CloseIcon />}
              label={`${selected} years`}
              onMouseDown={(e) => e.stopPropagation()}
            />
          )}
        >
          {Array.from({ length: 10 }, (_, i) => (
            <MenuItem key={i + 1} value={i + 1}>{i + 1} years</MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl variant="outlined" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel>Location</InputLabel>
        <Select
          value={filters.locationFilter}
          onChange={(e) => setFilters({ ...filters, locationFilter: e.target.value })}
          label="Location"
          renderValue={(selected) => selected ? (
            <Chip
              onDelete={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleClearFilter('location');
              }}
              deleteIcon={<CloseIcon />}
              label={selected}
              onMouseDown={(e) => e.stopPropagation()}
            />
          ) : 'All Locations'}
        >
          <MenuItem value="">All Locations</MenuItem>
          <MenuItem value="remote">Remote</MenuItem>
          <MenuItem value="hybrid">Hybrid</MenuItem>
          <MenuItem value="In-Office">In-Office</MenuItem>
        </Select>
      </FormControl>

      <FormControl variant="outlined" sx={{ m: 1, minWidth: 170 }}>
        <InputLabel>Job Role</InputLabel>
        <Select
          value={filters.jobRole}
          onChange={(e) => setFilters({ ...filters, jobRole: e.target.value })}
          label="Job Role"
          renderValue={(selected) => (
            <Chip
              onDelete={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleClearFilter('jobRole');
              }}
              deleteIcon={<CloseIcon />}
              label={selected}
              onMouseDown={(e) => e.stopPropagation()}
            />
          )}
        >
          <MenuItem value="">All Roles</MenuItem>
          <MenuItem value="frontend">Frontend</MenuItem>
          <MenuItem value="backend">Backend</MenuItem>
          <MenuItem value="android">Android</MenuItem>
          <MenuItem value="ios">iOS</MenuItem>
          <MenuItem value="tech lead">Tech Lead</MenuItem>
        </Select>
      </FormControl>

      <FormControl variant="outlined" sx={{ m: 1, minWidth: 170 }}>
        <InputLabel>Min Base Pay</InputLabel>
        <Select
          value={filters.minBasePay}
          onChange={(e) => setFilters({ ...filters, minBasePay: e.target.value })}
          label="Min Base Pay"
          renderValue={(selected) => (
            <Chip
              onDelete={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleClearFilter('minBasePay');
              }}
              deleteIcon={<CloseIcon />}
              label={`$${selected}K`}
              onMouseDown={(e) => e.stopPropagation()}
            />
          )}
        >
          {Array.from({ length: 10 }, (_, i) => (
            <MenuItem key={i} value={(i + 1) * 10}>{(i + 1) * 10}K</MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        label="Company Name"
        variant="outlined"
        value={filters.companyName}
        onChange={(e) => setFilters({ ...filters, companyName: e.target.value })}
        sx={{ m: 1, minWidth: 170 }}
      />
    </div>
  );
}

export default JobFilters;
