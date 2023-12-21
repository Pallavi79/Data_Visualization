const express = require('express');
const {ServerConfig} = require('./config');
const cors = require('cors');
const apiRoutes = require('./routes');


const app = express();

const mongoose = require('mongoose');

const connectDB = async () => {
    try {
      await mongoose.connect(ServerConfig.DB_URL);
      console.log('MongoDB connected');
    } catch (err) {
      console.error('Error connecting to MongoDB:', err.message);
      process.exit(1); // Exit process with failure
    }
  };

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//Routes
app.use('/api',apiRoutes);


app.listen(ServerConfig.PORT, ()=>{
    console.log(`Successfully started the server on port ${ServerConfig.PORT}`);
});