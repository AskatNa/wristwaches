WristWatches - Setup 

Clone the Repository
git clone https://github.com/your-username/wristwatches.git

Navigate to the Project Directory
Change into the project folder using:
cd wristwatches

Install Dependencies
Run the following command to install the necessary Node.js packages:
npm install 
  "bcrypt": "^5.1.1", 
  "dotenv": "^16.4.7",
  "express": "^4.21.2",
  "express-session": "^1.18.1",
  "mongodb": "^6.13.1",
  "mongoose": "^8.10.1",
  "nodemailer": "^6.10.0"

Technologies:
Backend: Node.js, Express.js
Database: MongoDB
Frontend: HTML, CSS, BOOTSTRAP, JAVASCRIPT
  
Configure Environment Variables
Create a .env file in the root directory and add the following variables:
PORT=your_port
SESSION_SECRET=your_secret_key  
MONGO_DB=your_mongodb_connection_string  
ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_admin_password

Start the Server
Run the following command to start the server:
node server.js
For development, you can use nodemon (if installed) with:
nodemon server.js

Access the Application
Open a web browser and go to:
http://localhost:PORT
