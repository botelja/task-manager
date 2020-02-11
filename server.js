const express = require('express');
const connectDB = require('./config/db');
const app = express();

//Connect database
connectDB();

//Init Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) =>
  res.json({ msg: 'Wellcome to the TaskManager API...' })
);

app.use('/api/tasks', require('./routes/tasks.js'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server strated on port ${PORT}`));
