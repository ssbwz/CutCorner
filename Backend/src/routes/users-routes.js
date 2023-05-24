const http = require('http');
const url = require('url');
const userController = require("../controllers/users-controller")


exports.userRoutes = async (req, res) => {
  const urlParts = req.url.split('/');

 if (req.method === 'GET' && urlParts[3] !== '') {
    userController.getUserByEmail(req, res);
  }
  else if (req.method === 'GET' ) {
    userController.getUsers(req, res);
  }

}