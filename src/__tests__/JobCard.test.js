import { render, screen, fireEvent } from '@testing-library/react';
import JobCard from '../Components/JobCard';
import { act } from 'react';

const mockJob = {
  companyName: 'TechCorp',
  jobRole: 'Software Engineer',
  location: 'Remote',
  minJdSalary: 80,
  maxJdSalary: 120,
  logoUrl: '/logo.png',
  jobDetailsFromCompany: 'This is an exciting job at TechCorp.',
  minExp: 2,
  jdLink: 'https://example.com/job'
};

test('renders JobCard correctly and opens modal', () => {
  render(<JobCard job={mockJob} />);

  // Verify that "TechCorp" appears at least once
  const allTechCorp = screen.getAllByText(/techcorp/i);
  expect(allTechCorp.length).toBeGreaterThan(0);

  expect(screen.getByText(/software engineer/i)).toBeInTheDocument();
  expect(screen.getByText(/remote/i)).toBeInTheDocument();

  // Custom function to find formatted salary
  expect(screen.getByText((content, element) => {
    const hasText = (node) => node.textContent === 'Estimated Salary: $80k - $120k ✅';
    return hasText(element);
  })).toBeInTheDocument();

  // Simulate modal opening
  fireEvent.click(screen.getByText(/view job/i));

  // Using `getAllByText` to handle multiple instances
  const jobDetails = screen.getAllByText(/this is an exciting job at techcorp/i);
  expect(jobDetails.length).toBeGreaterThan(0);
});
