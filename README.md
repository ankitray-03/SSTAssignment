
# Github SEarch - Node.js and React Website with MySQL Database

Welcome to my Node.js and React website project with MySQL as the database backend! This project allows users to fetch user details and repository details from GitHub using a GitHub username. It also implements pagination for displaying repositories.

## Features

- Fetch user details and repository details from GitHub API
- Utilizes MySQL database for data storage
- Implements pagination for displaying repositories
- Simple and intuitive UI

## Technologies Used

- Node.js
- React
- MySQL
- Axios for making HTTP requests

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

- Node.js installed on your local machine
- MySQL database setup

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/yourusername/your-repo-name.git

2. Navigate to your project dir
    ```sh
    cd your-repo
3. Install dependencies:
    
    ```sh
    npm install

    cd client
    npm install

    
4. Set up MySQL database:
* Create a MySQL database.
* Make a .env file in root folder and save MySQL conenction credentials.
* Update the MySQL connection details in the backend (server/db/connect.js) file.

5. Start the server
    * In root folder run this command to start the server.
    ```sh
    npm start

6. Start the React app:
* In client folder run this code to run frontend part.
    ```sh
    npm run dev

7. Open your browser and navigate to http://localhost:5173 to view the app.
