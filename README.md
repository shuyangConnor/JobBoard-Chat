# JobHub

JobHub is a GraphQL-based job board application designed to connect job seekers with employment opportunities. Leveraging modern web technologies such as Apollo Client, Apollo Server, SQLite, React, and Node.js, JobHub offers a seamless user experience for browsing and applying to job listings.

## Technologies Used

- **GraphQL**: A query language for APIs used to define the application's data structure and operations.
- **Apollo Client**: A comprehensive state management library that simplifies data fetching and management in React applications.
- **Apollo Server**: A GraphQL server implementation that serves as the backend for the JobHub application, handling data fetching and processing.
- **SQLite**: A lightweight relational database management system used for storing job listings and related data.
- **React**: A JavaScript library for building user interfaces, used to create the frontend of the JobHub application.
- **Node.js**: A JavaScript runtime environment used to run the server-side logic of the JobHub application.

## Features

- **GraphQL Integration**: JobHub utilizes GraphQL for defining the application's data schema and querying data from the server.
- **Apollo Client/Server**: Apollo Client is used on the frontend to manage application state and fetch data from the server, while Apollo Server is employed on the backend to handle GraphQL queries and mutations.
- **DataLoader Implementation**: DataLoader is used to set up per-request batching for SQLite database requests, optimizing performance and maintaining cache accuracy by mitigating the N+1 query problem.
- **Real-time Communication**: JobHub implements GraphQL Subscriptions over WebSocket to enable real-time communication, allowing users to receive instant updates on job listings.

## Getting Started

To get started with JobHub, follow these steps:

1. Clone the repository: `git clone https://github.com/shuyangConnor/job-board-client.git`
2. Do the following in both server and client directory, under job-board folder.
3. Install dependencies: `npm install`
4. Start the development server: `npm start`
5. Open your browser and navigate to `http://localhost:3000`

## Contributing

Contributions are welcome! Feel free to fork the repository and submit pull requests to contribute new features, enhancements, or bug fixes.
