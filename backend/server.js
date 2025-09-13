const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Server is running 🚀');
});


const startServer = async () => {
  const dbConnected = await connectDB();
  if (dbConnected) {
    app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
  } else {
    console.log('Failed to start server due to database connection error');
  }
};

startServer();
