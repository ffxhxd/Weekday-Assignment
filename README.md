
# Weekday Assignment: Candidate Application Platform

## Overview

This project is a Candidate Application Platform that enables users to view job listings, filter job posts based on various criteria, and scroll infinitely for a seamless browsing experience.

## Features

- **Job Cards**: Each job card displays essential details like the title, company name, location, job description (truncated), required experience, and a link to apply.
- **Filters**: The platform includes filters based on minimum experience, company name, location, remote/on-site, tech stack, role, and minimum base pay.
- **Infinite Scroll**: Automatically loads more job cards as the user scrolls down, eliminating the need for a "Load More" button.
- **Responsive Design**: The platform is designed to be responsive and works across various devices.

## Technology Stack

- **Frontend**: React.js, Redux
- **Styling**: CSS, Material-UI
- **API Integration**: Fetch API for job data

## Installation and Setup

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/ffxhxd/Weekday-Assignment.git
   ```
2. **Install Dependencies:**
   Navigate to the project's root directory and install the required dependencies using npm or yarn:
   ```bash
   cd Weekday-Assignment
   npm install
   ```
3. **Run the Application:**
   To start the development server, execute:
   ```bash
   npm start
   ```
4. **Access the Application:**
   Open your browser and navigate to `http://localhost:3000` to access the Candidate Application Platform.

## Usage

- **Browsing Jobs:** Scroll down the page to load additional job cards seamlessly.
- **Applying Filters:** Use the available filters to refine the job listings based on the specified criteria.

## Considerations

- **Handling Null Data:** The job cards handle null values gracefully by excluding them from the displayed data.
- **Filter Logic:** Filtering is implemented on the frontend, only using the data available up to that point.

## Author

- [Fahad](https://github.com/ffxhxd)

## Best Industry Standard Practices Implemented

- **Custom Hooks for API Calls:** Utilizing custom hooks enhances reusability and maintains a clear separation of concerns.
- **Centralized Constants:** All hardcoded strings and URLs are consolidated in a separate `constant.js` file, promoting centralized configuration for easy maintenance.
- **Utility Functions in Utils Folder:** The `utils` folder houses utility functions and helper modules, fostering modularity and code organization.
- **Compact Components for Readability:** Components are designed to be concise, with each containing 80-100 lines of code, improving readability and ease of maintenance.
- **DRY Principle Adhered To:** The Don't Repeat Yourself (DRY) principle is consistently followed, minimizing redundancy and improving code maintainability.
- **Single Responsibility Principle Maintained:** Components adhere to the Single Responsibility Principle (SRP), ensuring each component has a focused purpose for better maintainability.
- **Clean, Optimized, and Scalable Codebase:** The codebase is clean, optimized, and scalable, prioritizing clarity, performance, and adaptability to evolving requirements.
- **Organized Component and Styling Structure:** Components and their styling files are organized in separate folders, enhancing code organization and ease of styling updates.
- **Robust Error Handling:** Comprehensive error-handling mechanisms have been implemented, providing meaningful messages for debugging.
- **Thorough Manual Testing:** Rigorous manual testing has been conducted across various devices, ensuring a robust and user-friendly application.
- **Unit Tests in Jest:** Comprehensive unit tests have been written using Jest with 100% coverage.

- ## Made with ❤️ for Weekday
