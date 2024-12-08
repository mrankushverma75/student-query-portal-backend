Setup and Installation

Prerequisites
1. Node.js (v14+)
2. PostgreSQL
3. npm or yarn

Steps to Run Locally
1. Clone the repository: git clone https://github.com/your-repo-url/query-management-system.git
2. cd query-management-system
3. Install dependencies: npm install
4. Configure environment variables: Create a .env file in the root directory:
    .env
        PORT=8080
        JWT_SECRET=your_secret_key
        JWT_EXPIRATION=1h
        DB_NAME=query_system
        DB_USER=db_user
        DB_PASSWORD=db_password
        DB_HOST=db_host
        DB_PORT=db_port

5. npm run dev
