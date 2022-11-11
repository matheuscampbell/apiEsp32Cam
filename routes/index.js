var express = require('express');
var router = express.Router();
var clientModel = require('../model/users');
var dbconfig = require('../model/Conn');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/images/:image', function(req, res, next) {
    var image = req.params.image;
    res.sendFile(__dirname + './public/images/' + image);
});



router.get('/db', async function(req, res, next) {
  //cria um usuário genérico
    await dbconfig.makeTables();
    await clientModel.createUser('Teste', 'teste@teste.com', 'teste');
  var users = await clientModel.getUsers();
    res.send(users);
});


module.exports = router;
