var express = require('express');
var router = express.Router();
var api = require('../controller/apiFuncitions');
var users = require('../model/users');
var faceRecognition = require('../controller/FaceController');
const notificacoes = require("../model/Notifications");
const produtos = require("../model/Products");
const apiFuncitions = require("../controller/apiFuncitions");
const fs = require("fs");
const {exec} = require("child_process");
const modelReconhecimento = require("../model/Reconhecimentos");
router.post('/login', async function (req, res, next) {
    var token = api.getToken(req);
    if (token) {
        const user = await users.getUserByToken(token);
        if (user) {
            res.send({status: 200, message: 'User is already logged in'});
        }
    } else {
        const email = req.body.email;
        const password = req.body.password;
        const [user] = await users.getUserByEmail(email);
        if (user) {
            if (user.password == password) {
                const token = api.generateToken();
                await users.setUserToken(user.id, token);
                res.send({status: 200, message: 'Login successful', token: token});
            } else {
                res.send({status: 401, message: 'Invalid password'});
            }
        }
    }
});

router.post('/register', async function (req, res, next) {
    var nome, email, password;
    nome = req.body.nome;
    email = req.body.email;
    password = req.body.password;
    var token = api.generateToken();
    if (users.getUserByEmail(email).length > 0) {
        res.send({status: 401, message: 'Email already registered'});

    } else {
        var user = await users.createUser(nome, email, password, token);
        if (user) {
            res.send({status: 200, message: 'User registered successfully', token: token});
        } else {
            res.send({status: 401, message: 'Error registering user'});
        }
    }
});

router.post('/uploadUserImage', async function (req, res, next) {
    var token = api.getToken(req);
    if (token) {
        const [user] = await users.getUserByToken(token);
        if (user) {
            var uniqueId = Date.now();
            const {imageFile} = req.files;
            if (!imageFile) return res.sendStatus(400);
            var imageName = uniqueId + imageFile.name;
            var fileName = __dirname.replace('routes', '') + '\\public\\images\\' + imageName;
            imageFile.mv(fileName);
            exec("python ./python/faceDetection.py " + fileName, ( e,stdout) => {
                console.log(`stdout: ${stdout}`,stdout.split('true').length);
                if (stdout.split('true').length <= 1) {
                    fs.unlinkSync(fileName);
                    res.send({status: 400, message: 'error', error: 'No faces'});
                } else {
                    console.log("reconhecido");
                    users.addUserImage(user.id,imageName);
                    users.setUserImage(user.id,imageName);
                    res.send({status:200, message:"Imagem adicionada com sucesso", image:'/image/'+imageName});
                }
            });


        }else{
            res.send({status: 400, message: 'error', error: 'No user'});
        }
    }else{
        res.send({status: 400, message: 'error', error: 'No user'});
    }
});

router.get('/logout', async function (req, res, next) {
    var token = api.getToken(req);
    if (token) {
        await users.deleteUserByToken(token);
        res.send({status: 200, message: 'Logout successful'});
    } else {
        res.send({status: 401, message: 'User is not logged in'});
    }
});


router.get('/getUserByToken', async function (req, res, next) {
    var token = api.getToken(req);
    if (token) {
        const [user] = await users.getUserByToken(token);
        if (user) {
            res.send({status: 200, message: 'User is already logged in', user: user});
        }
    } else {
        res.send({status: 401, message: 'User is not logged in'});
    }
});


router.get('/produtos', async function (req, res, next) {
    var token = api.getToken(req);
    if (token) {
        const user = await users.getUserByToken(token);
        if (user) {
            var prods = await produtos.getProductsForUser(user.id);
            if (prods.length > 0) {
                res.send({status: 200, message: 'Products found', produtos: prods});
            } else {
                const prods = await produtos.getProducts();
                res.send({status: 200, message: 'todos produtos', produtos: prods});
            }
        }
    } else {
        res.send({status: 401, message: 'User is not logged in'});
    }
});

//departamentos
router.get('/departamentos', async function (req, res, next) {
    var token = api.getToken(req);
    if (token) {
        const [user] = await users.getUserByToken(token);
        if (user) {
            var prods = await produtos.getDepartmentsForUser(user.id);
            if (prods.length > 0) {
                res.send({status: 200, message: 'Departments found', departamentos: prods});
            } else {
                var prods = await produtos.getDepartments();
                res.send({status: 200, message: 'No departments found', departamentos: prods});
            }
        }
    } else {
        res.send({status: 401, message: 'User is not logged in'});
    }
});

//notificações
router.get('/notifications', async function (req, res, next) {
    var token = api.getToken(req);
    if (token) {
        const user = await users.getUserByToken(token);
        if (user) {
            const nots = await notificacoes.getNotificationsForUser(user.id);
            if (nots) {
                res.send({status: 200, message: 'Notifications found', notificacoes: nots});
                notificacoes.readNotificationUser(user.id);
            } else {
                res.send({status: 401, message: 'No notifications found'});
            }
        }
    } else {
        res.send({status: 401, message: 'User is not logged in'});
    }
});


module.exports = router;