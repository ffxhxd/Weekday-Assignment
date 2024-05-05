import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, Chip, TextField, Box } from '@mui/material';

function JobFilters({ filters, setFilters }) {
  // Clear a specific value from a multi-value filter or clear entirely
  const handleClearFilter = (filter, value = null) => {
    if (value !== null) {
      setFilters({ ...filters, [filter]: filters[filter].filter((item) => item !== value) });
    } else {
      setFilters({ ...filters, [filter]: '' });
    }
  };

  // Update the filter state with the selected values
  const handleSelectChange = (filter, event) => {
    const value = event.target.value;
    setFilters({ ...filters, [filter]: typeof value === 'string' ? value.split(',') : value });
  };

  // Render chips with the ability to prevent the dropdown from opening
  const renderChip = (filterName, label, value) => (
    <Chip
      key={`${filterName}-${value}`}
      label={label}
      onMouseDown={(e) => {
        e.stopPropagation(); // Prevent dropdown from opening
      }}
      onDelete={(e) => {
        e.stopPropagation(); // Prevent dropdown from opening
        handleClearFilter(filterName, value);
      }}
    />
  );

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: 2, p: 2 }}>
      {/* Min Experience Filter */}
      <FormControl variant="outlined" sx={{ m: 1, minWidth: 170 }}>
        <InputLabel>Min Experience</InputLabel>
        <Select
          multiple
          value={filters.minExperience}
          onChange={(e) => handleSelectChange('minExperience', e)}
          label="Min Experience"
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) =>
                renderChip('minExperience', `${value} years`, value)
              )}
            </Box>
          )}
        >
          {Array.from({ length: 10 }, (_, i) => (
            <MenuItem key={i + 1} value={i + 1}>{i + 1} years</MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Job Role Filter */}
      <FormControl variant="outlined" sx={{ m: 1, minWidth: 170 }}>
        <InputLabel>Job Role</InputLabel>
        <Select
          multiple
          value={filters.jobRole}
          onChange={(e) => handleSelectChange('jobRole', e)}
          label="Job Role"
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) =>
                renderChip('jobRole', value, value)
              )}
            </Box>
          )}
        >
          <MenuItem value="frontend">Frontend</MenuItem>
          <MenuItem value="backend">Backend</MenuItem>
          <MenuItem value="android">Android</MenuItem>
          <MenuItem value="ios">iOS</MenuItem>
          <MenuItem value="tech lead">Tech Lead</MenuItem>
        </Select>
      </FormControl>

      {/* Location Filter */}
      <FormControl variant="outlined" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel>Location</InputLabel>
        <Select
          value={filters.locationFilter}
          onChange={(e) => setFilters({ ...filters, locationFilter: e.target.value })}
          label="Location"
          renderValue={(selected) => (
            <Box>
              <Chip
                onMouseDown={(e) => {
                  e.stopPropagation(); // Prevent dropdown from opening
                }}
                onDelete={(e) => {
                  e.stopPropagation(); // Prevent dropdown from opening
                  handleClearFilter('locationFilter');
                }}
                label={selected || 'All Locations'}
              />
            </Box>
          )}
        >
          <MenuItem value="">All Locations</MenuItem>
          <MenuItem value="remote">Remote</MenuItem>
          <MenuItem value="hybrid">Hybrid</MenuItem>
          <MenuItem value="In-Office">In-Office</MenuItem>
        </Select>
      </FormControl>

      {/* Min Base Pay Filter */}
      <FormControl variant="outlined" sx={{ m: 1, minWidth: 170 }}>
        <InputLabel>Min Base Pay</InputLabel>
        <Select
          value={filters.minBasePay}
          onChange={(e) => setFilters({ ...filters, minBasePay: e.target.value })}
          label="Min Base Pay"
          renderValue={(selected) => (
            <Box>
              <Chip
                onMouseDown={(e) => {
                  e.stopPropagation(); // Prevent dropdown from opening
                }}
                onDelete={(e) => {
                  e.stopPropagation(); // Prevent dropdown from opening
                  handleClearFilter('minBasePay');
                }}
                label={`$${selected}K`}
              />
            </Box>
          )}
        >
          {Array.from({ length: 10 }, (_, i) => (
            <MenuItem key={i} value={(i + 1) * 10}>{(i + 1) * 10}K</MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Company Name Filter */}
      <TextField
        label="Company Name"
        variant="outlined"
        value={filters.companyName}
        onChange={(e) => setFilters({ ...filters, companyName: e.target.value })}
        sx={{ m: 1, minWidth: 170 }}
      />
    </Box>
  );
}

export default JobFilters;
