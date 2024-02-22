const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./src/config/db');

// Connect to database
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Define routes
app.use('/api/book', require('./src/routes/bookRoutes'));
app.use('/api/user', require('./src/routes/userRoutes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
