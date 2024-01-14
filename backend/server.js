const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/authRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();
connectDB();

app.use('/api/auth', userRoutes);
app.use('/api/employee', employeeRoutes);

// -----------------Deployment------------

const __dirname1 = path.resolve();
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname1, '../frontend/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname1, 'frontend', 'build', 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send('api is running successfully');
  });
}
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server is running on PORT ${PORT}`);
});
