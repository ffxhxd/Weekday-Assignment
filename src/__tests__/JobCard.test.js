import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import JobCard from '../Components/JobCard';

// Mock job data
const job = {
  logoUrl: 'https://via.placeholder.com/56',
  companyName: 'Tech Corp',
  jobRole: 'Software Engineer',
  location: 'San Francisco, CA',
  minExp: 2,
  maxExp: 5,
  minJdSalary: 80,
  maxJdSalary: 120,
  jobDetailsFromCompany: 'We are looking for a talented Software Engineer...',
  jdLink: 'https://techcorp.jobs/software-engineer'
};

describe('JobCard Component', () => {
  it('renders the job information correctly', () => {
    render(<JobCard job={job} />);

    expect(screen.getByText(job.companyName)).toBeInTheDocument();
    expect(screen.getByText(job.jobRole)).toBeInTheDocument();
  });

  it('closes the modal when pressing "Escape"', () => {
    render(<JobCard job={job} />);

    // Open the modal
    fireEvent.click(screen.getByText('View Job'));

    // Verify that modal content is initially visible
    expect(screen.getByText('View Job Posting')).toBeInTheDocument();

    // Press escape key to close
    fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });

    // Make sure the modal content is no longer visible
    expect(screen.queryByText('View Job Posting')).not.toBeInTheDocument();
  });
});
