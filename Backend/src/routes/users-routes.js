const router = require('express').Router();
const userController = require("../controllers/users-controller");

router.get('/', async (req, res) => {
 userController.getUsers().then((result) => {
    if (result) {
      res.writeHead(200, { 'Content-Type': 'text/json' });
      res.end(JSON.stringify(result));
      return
    }

    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end("Couldn't find the users");
  });


});

router.get('/username/:username', async (req, res) => {
  const searchedUsername = req.params.username;

  const user = userController.getUserByUsername(searchedUsername);
  if (user) {
    res.writeHead(200, { 'Content-Type': 'text/json' });
    res.end(JSON.stringify(user));
    return
  }

  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end("Couldn't find the user");
});


router.get('/me', async (req, res) => {
  //todo: get the user id using the token
  const userid = "3e4258d8-e054-4a0d-8c2a-53cb6ba188c4"
  userController.getUserById(userid).then((result) => {
     if (result) {
       res.writeHead(200, { 'Content-Type': 'text/json' });
       res.end(JSON.stringify(result));
       return
     }
 
     res.writeHead(404, { 'Content-Type': 'text/plain' });
     res.end("Couldn't find the user");
   });
 
 
 });

module.exports = router;