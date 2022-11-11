var express = require('express');
var router = express.Router();
var api = require('../controller/apiFuncitions');
var users = require('../model/users');
var faceRecognition = require('../controller/FaceController');
const notificacoes = require("../model/Notifications");
const produtos = require("../model/Products");

router.post('/login',  async function(req, res, next) {
  var token = api.getToken(req);
    if (token) {
      const user =await users.getUserByToken(token);
        if (user) {
          res.send({status: 200, message: 'User is already logged in'});
        }
    }else {
      const email = req.body.email;
        const password = req.body.password;
        const [user] = await users.getUserByEmail(email);
        if (user) {
            if (user.password == password) {
                const token = api.generateToken();
                await users.setUserToken(user.id, token);
                res.send({status: 200, message: 'Login successful', token: token});
            }else {
                res.send({status: 401, message: 'Invalid password'});
            }
        }
    }
});

router.post('/register', async function(req, res, next) {
  var nome, email, password;
    nome = req.body.nome;
    email = req.body.email;
    password = req.body.password;
    var token = api.generateToken();
    if(users.getUserByEmail(email).length > 0) {
        res.send({status: 401, message: 'Email already registered'});

    }else {
        var user = await users.createUser(nome, email, password, token);
        if (user) {
            res.send({status: 200, message: 'User registered successfully', token: token});
        } else {
            res.send({status: 401, message: 'Error registering user'});
        }
    }
});

router.post('/uploadUserImage', async function(req, res, next) {
var token = api.getToken(req);
    if (token) {
        const user =await users.getUserByToken(token);
            if (user) {
            var image = req.body.image;
                var uniqueId = api.generateUniqueId();
                var image_extension = api.getImageExtension(image);
                var image_name = uniqueId + image_extension;
                var image_path = 'public/images/' + image_name;
                var image_url = '/userImage/' + image_name;
                var base64Data = image.replace(/^data:image\/png;base64,/, "");
                fs.writeFile(image_path, base64Data, 'base64', async function (err) {
                  if (err) {
                    console.log(err);
                  } else {
                    console.log("Image saved");
                    const hasFace = await faceRecognition.hasFaceInImage(image_path);
                    if(hasFace != 'true'){
                      res.send({status: 401, message: 'No face found in image'});
                    }else{
                      users.setUserImage(user.id, image_name);
                      users.addUserImage(user.id, image_name);
                      res.send({status: 200, message: 'Image uploaded successfully', image: image_url});
                    }
                  }
                });
                res.send({status: 200, message: 'Image uploaded successfully', image_url: image_url});
            }else {
            res.send({status: 401, message: 'Invalid token'});
            }
    }
});

router.get('/logout', async function(req, res, next) {
    var token = api.getToken(req);
        if (token) {
            await users.deleteUserByToken(token);
            res.send({status: 200, message: 'Logout successful'});
        }else {
            res.send({status: 401, message: 'User is not logged in'});
        }
});


router.get('/getUserByToken', async function(req, res, next) {
    var token = api.getToken(req);
        if (token) {
        const [user] = await users.getUserByToken(token);
            if (user) {
            res.send({status: 200, message: 'User is already logged in', user: user});
            }
        }else {
        res.send({status: 401, message: 'User is not logged in'});
        }
});


router.get('/produtos', async function(req, res, next) {
    var token = api.getToken(req);
        if (token) {
        const user = await users.getUserByToken(token);
            if (user) {
               const prods = await produtos.getProductsForUser(user.id);
               if(prods){
                res.send({status: 200, message: 'Products found', produtos: prods});
               }else{
                res.send({status: 401, message: 'No products found'});
               }
            }
        }else {
            res.send({status: 401, message: 'User is not logged in'});
        }
});

//notificações
router.get('/notifications', async function(req, res, next) {
var token = api.getToken(req);
        if (token) {
        const user = await users.getUserByToken(token);
            if (user) {
               const nots = await notificacoes.getNotificationsForUser(user.id);
               if(nots){
                res.send({status: 200, message: 'Notifications found', notificacoes: nots});
                notificacoes.readNotificationUser(user.id);
               }else{
                res.send({status: 401, message: 'No notifications found'});
               }
            }
        }else {
            res.send({status: 401, message: 'User is not logged in'});
        }
});



module.exports = router;