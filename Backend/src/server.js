const http = require('http');
const url = require('url');
const querystring = require('querystring');
const { userRoutes } = require('./routes/users-routes');
const HttpError = require('http-error');

const PORT = 5000;


const server = http.createServer(async (req, res) => {
  const { pathname } = url.parse(req.url, true);
  if (pathname.startsWith('/users')) {
    userRoutes(req, res);
  }
});

server.on('error', (error) => {
  console.error(error);
  process.exit(1);
});


server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
