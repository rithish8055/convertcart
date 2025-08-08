** Deliverables**
 **GitHub repository with clean commit history**
 https://github.com/rithish8055/convertcart
  
 **Live deployment link**
Frontend: https://convertcart-frontend.vercel.app
Backend: https://convertcart-backend.vercel.app


 **Setup Instructions**
**	Backend Setup**
  1, Create a folder name backend
  2, Navigate to the backend folder
  3, cd backend
  4, npm init -y
  5, npm install express
  6, create index.js
        const express = require('express');
        const app = express();
        const PORT = process.env.PORT || 3000;
        // Middleware to parse JSON
        app.use(express.json());
        // Basic route
        app.get('/', (req, res) => {
          res.send('Hello from Express!');
        });
        // Start server
        app.listen(PORT, () => {
          console.log(`Server running on http://localhost:${PORT}`);
        });
        
  7, Create .env file
  8, Inside the .env file add PORT number and MONGODB_URI
        PORT =3001
        MONGODB_URI=mongodb+srv://rithish:Rithish@woocommerce.zksusye.mongodb.net/woocommerce
  9, npm install --save-dev nodemon
  10, Update package.json:
      “scripts": {
      "start": "nodemon index.js"
      }
  11, Run the server
        npm start
  12, Now Server running on http://localhost:3001

 **Setup Instructions**
	**Frontend Setup**
 
  1, Install Node.js (if not already)
  2, Download and install Node.js from: https://nodejs.org/
  3, Check Version 
        node -v
        npm -v
  4, Create a folder name frontend
  5, Navigate to the frontend folder
  6, cd frontend
  7, Create Your React App
        npx create-react-app my-react-app
  8, Start the development server
        cd my-react-app
        npm start
  9, Add a .env file in the root of your React project
        REACT_APP_API_URL=http://localhost:3001
  10, Install additional packages (like Axios, Router, etc.)
        npm install axios
        npm install react-router-dom

** Description of Ingestion Logic**

The ingestion logic is defined in syncProducts.js. It performs the following steps:

  1, Fetches product data from an external API.
  2, Cleans/transforms the product data to match the schema.
  3, Upserts data into MongoDB
  
**Sample Input for Segmentation**

Segmentation rules can be applied using JSON input via the /segment API.
    Example:
    {
      price > 50, 
      category = Jackets, 
      stock_status = instock
    }
** Links to Live Frontend/Backend Demos**
Frontend: https://convertcart-frontend.vercel.app
Backend: https://convertcart-backend.vercel.app

**Tools**
● GitHub repository with clean commit history
https://github.com/rithish8055/convertcart
● Live deployment link
https://convertcart-frontend.vercel.app

**AI Usage Notes**
  1, Tool you used (ChatGPT, Perplexity).
  2, Used ChartGPT for UI designing.
  3, Used Perplexity in backend to resolve the Bugs.
  4, I replaced the popup message with a dedicated display section to show output more clearly, and I also integrated        API calls directly into the frontend for real-time data handling.
