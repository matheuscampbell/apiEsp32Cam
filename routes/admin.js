var express = require('express');
var router = express.Router();
const apiFuncitions = require('../controller/apiFuncitions');
const users = require('../model/users');
const produtos = require("../model/Products");
const recognition = require("../model/Reconhecimentos");
const Dispositivos = require("../model/Dispositivos");
const fs = require('fs');

router.post('/createloja',  async function(req, res, next) {
    var nome = req.body.nome;
    var loja = await Loja.createLoja(nome);
});



router.get('/users', async function(req, res, next) {
    var usuarios = await users.getUsers();
    res.send({status: 200, message: 'success', usuarios:usuarios});
});

router.get('/users/:id', async function(req, res, next) {
    var id = req.params.id;
    console.log('id: ' + id);
    var [user] = await users.getUsersById(id);
    res.send({status: 200, message: 'success', user:user});
});

router.get('/reconhecimentoscliente/:id', async function(req, res, next) {
    var id = req.params.id;
    var clienteRecognitions = await  recognition.getAllReconhecimentosByUser(id);
    res.send({status: 200, message: 'success', reconhecimentos:clienteRecognitions});
});

router.get('/interessesprodutoscliente/:id', async function(req, res, next) {
    var id = req.params.id;
    var clienteInteresses = await produtos.getProductsForUser(id);
    res.send({status: 200, message: 'success', interesses:clienteInteresses});
});

router.get('/interessesdepartamentoscliente/:id', async function(req, res, next) {
    var id = req.params.id;
    var clienteInteresses = await produtos.getDepartmentsForUser(id);
    res.send({status: 200, message: 'success', interesses:clienteInteresses});
});

router.get('/allprodutos', async function(req, res, next) {
    var p = await produtos.getProducts();
    res.send({status: 200, message: 'success', produtos:p});
});

router.get('/alldepartamentos', async function(req, res, next) {
    var departamentos = await produtos.getDepartments();
    res.send({status: 200, message: 'success', departamentos:departamentos});
});

router.post('/addproduto', async function(req, res, next) {
    var nome = req.body.nome;
    var departamento = req.body.departamento;
    var preco = req.body.preco;
    const { imageFile } = req.files;
    var uniqueId = apiFuncitions.generateUniqueId();
    var imageName = uniqueId +imageFile.name;
    if(imageFile){
        var fileName = 'public/images/'+imageName;
        imageFile.mv(fileName);
        var produto = await produtos.addProduct(nome, departamento, preco, imageName??null);
        if(produto){
            res.send({status: 200, message: 'success', produto:produto});
        }else{
            res.send({status: 400, message: 'error'});
        }
    }else{
        res.send({status: 400, message: 'error', error:'No image file'});
    }
});

//deleteproduto
router.delete('/deleteproduto/:id', async function(req, res, next) {
    var id = req.params.id;
    var produto = await produtos.deleteProduct(id);
    if(produto){
        res.send({status: 200, message: 'success', produto:produto});
    }else{
        res.send({status: 400, message: 'error'});
    }
});
router.post('/adddepartamento', async function(req, res, next) {
    var nome = req.body.nome;
    var departamento = await produtos.addDepartment(nome);
    if(departamento){
        res.send({status: 200, message: 'success', departamento:departamento});
    }else{
        res.send({status: 400, message: 'error'});
    }
});

router.get('/getDispositivos', async function(req, res, next) {
    var dispositivos = await Dispositivos.getDispositivos();
    res.send({status: 200, message: 'success', dispositivos:dispositivos});
});

router.post('/addDispositivo', async function(req, res, next) {
    var mac = req.body.mac;
    var loja = req.body.loja;
    var departamento = req.body.departamento;
    var produto = req.body.produto;
    var dispositivo = await Dispositivos.addDispositivo(mac, loja, departamento, produto);
    if(dispositivo){
        res.send({status: 200, message: 'success', dispositivo:dispositivo});
    }else {
        res.send({status: 400, message: 'error'});
    }
});

router.delete('/deleteDispositivo/:id', async function(req, res, next) {
    var id = req.params.id;
    var dispositivo = await Dispositivos.removeDispositivo(id);
    if(dispositivo){
        res.send({status: 200, message: 'success', dispositivo:dispositivo});
    }else {
        res.send({status: 400, message: 'error'});
    }
});










module.exports = router;