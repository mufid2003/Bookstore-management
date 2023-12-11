const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const apiRoutes = require('./src/routes/api');


const app = express();
const PORT = process.env.PORT;

app.use(cors());
// Middleware to parse JSON
app.use(express.json());

app.use('/api', apiRoutes);

// Routes
app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

// MongoDB Connection
const mongodbURI = process.env.MONGODB_URI;
mongoose.connect(mongodbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
