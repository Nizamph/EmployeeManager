const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/authRoutes');
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();
connectDB();

app.get('/', (req, res) => {
  res.send('api is running successfully');
});

app.use('/api/auth', userRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`server is started on PORT ${PORT}`);
});
