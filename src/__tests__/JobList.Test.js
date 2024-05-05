import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import 'intersection-observer';
import JobList from '../Components/JobList';

const mockStore = configureStore([]);
const initialState = {
  job: {
    jobs: [
      {
        jdUid: '1',
        companyName: 'TechCorp',
        jobRole: 'Frontend',
        location: 'Remote',
        minJdSalary: 80,
        maxJdSalary: 120,
        minExp: 3
      }
    ],
    error: null
  }
};

test('renders JobList with filtered jobs', () => {
  const store = mockStore(initialState);

  render(
    <Provider store={store}>
      <JobList />
    </Provider>
  );

  // Check if the job list displays a job matching criteria
  expect(screen.getByText(/techcorp/i)).toBeInTheDocument();
  expect(screen.getByText(/frontend/i)).toBeInTheDocument();
});
