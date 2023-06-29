require('dotenv').config({ path: __dirname + '/config.env' });
const express = require('express');
var cors = require('cors')

const userRoutes = require('./src/routes/users-routes'); 

const app = express();

app.use(cors())

app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`${timestamp}: ${req.method} ${req.url}`);
  next();
});

// routes
app.use('/users', userRoutes); 

app.on('error', (error) => {
  console.error(error);
  process.exit(1);
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
