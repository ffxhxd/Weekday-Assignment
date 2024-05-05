import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import JobList from '../Components/JobList';
import jobReducer from '../../src/Utils/Redux/jobSlice'; 

// Mock initial state for testing
const initialState = {
  job: {
    jobs: [
      {
        jdUid: '1',
        companyName: 'Tech Corp',
        jobRole: 'Software Engineer',
        location: 'San Francisco, CA',
        minExp: 2,
        maxExp: 5,
        minJdSalary: 80,
        maxJdSalary: 120,
      },
      {
        jdUid: '2',
        companyName: 'Biz Ltd',
        jobRole: 'Product Manager',
        location: 'Remote',
        minExp: 3,
        maxExp: 6,
        minJdSalary: 100,
        maxJdSalary: 150,
      },
    ],
    error: null,
  },
};

// Custom store setup for testing purposes
const createTestStore = (initialState) =>
  configureStore({
    reducer: {
      job: jobReducer,
    },
    preloadedState: initialState,
  });

describe('JobList Component', () => {
  const renderWithStore = (ui, { store }) =>
    render(<Provider store={store}>{ui}</Provider>);

  it('renders job filters and job list content', () => {
    const store = createTestStore(initialState);
    renderWithStore(<JobList />, { store });

    // Verify presence of JobFilters component
    expect(screen.getByText(/Filters/i)).toBeInTheDocument(); // Assumes a heading or label with "Filters" in JobFilters

    // Verify presence of job cards based on mock data
    expect(screen.getByText(/Tech Corp/i)).toBeInTheDocument();
    expect(screen.getByText(/Software Engineer/i)).toBeInTheDocument();
    expect(screen.getByText(/Product Manager/i)).toBeInTheDocument();
  });

  it('filters jobs by minimum base pay', () => {
    const store = createTestStore(initialState);
    renderWithStore(<JobList />, { store });

    // Find and change the base pay input (you might need to adjust this to match your JobFilters component)
    const basePayInput = screen.getByLabelText(/Minimum Base Pay/i);
    fireEvent.change(basePayInput, { target: { value: '90' } });

    // Expect "Tech Corp" job to not be displayed because it doesn't meet the filter criteria
    expect(screen.queryByText(/Tech Corp/i)).not.toBeInTheDocument();

    // Expect "Biz Ltd" job to still be displayed
    expect(screen.getByText(/Biz Ltd/i)).toBeInTheDocument();
  });

  it('filters jobs by job role', () => {
    const store = createTestStore(initialState);
    renderWithStore(<JobList />, { store });

    // Simulate selecting "Product Manager" as a job role (adjust selector/method based on your JobFilters)
    const roleCheckbox = screen.getByLabelText(/Product Manager/i); // Assuming checkboxes have appropriate labels
    fireEvent.click(roleCheckbox);

    // Expect "Tech Corp" job to not be displayed
    expect(screen.queryByText(/Tech Corp/i)).not.toBeInTheDocument();

    // Expect "Biz Ltd" job to still be displayed
    expect(screen.getByText(/Biz Ltd/i)).toBeInTheDocument();
  });
});
