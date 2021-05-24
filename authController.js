const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const localStorage = require('./localStorage');
const Ajv = require('ajv');
const ajv = new Ajv({schemaId: 'auto'});
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const stripe = require('./remoteServer/stripe');


router.use(jsonParser);

router.use(function (req, res, next) {
    if (!req.query.userName){
        res.status(400);
        res.send("missing mandatory params")
    }
    else{
        next();
    }
});

router.post('/login', function(req, res) {
    const user = localStorage.getKey('users', req.query.userName);
    let userParse;
    try{
        if (!user){
            throw "user not exist";
        }
        userParse = JSON.parse(user);
        const token = jwt.sign(userParse, 'supersecret', {expiresIn: 86400 });
        res.set('authorization', token);
        localStorage.setKey('tokens', req.query.userName,token);
        res.status(200).send({ auth: true});
    }catch (error) {
        res.status(400).send(error);
    }
});

router.delete('/logout', (req, res)=> {
    let message = "token not found";
    const token = localStorage.getKey('tokens', req.query.userName);
    if (token){
        localStorage.removeKey('tokens', req.query.userName);
        message = "token deleted";
    }
    res.status(200);
    res.send(message)
});

router.get('/menu', (req,res)=>{
    let token = req.headers['authorization'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    jwt.verify(token, 'supersecret', function(err, decoded) {
        const getToken = localStorage.getKey('tokens', req.query.userName);
        if (err || getToken !== token) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        res.status(200).send(require('./staticData/pizzMenu'));
    });
});


router.post('/shopping',(req,res)=>{
    let token = req.headers['authorization'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    jwt.verify(token, 'supersecret', function(err, decoded) {
        const getToken = localStorage.getKey('tokens', req.query.userName);
        if (err || getToken !== token) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        let validateSchema = ajv.compile(require('./staticData/schema'));
        if (!validateSchema(req.body)){
            res.status(400).send({errorCode : "invalidSchema",errorText : validateSchema.errors});
        }else{
            res.status(200).send("you order is complit");
        }
    });
});

router.post('/charge',(req, res)=>{
    let token = req.headers['authorization'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    jwt.verify(token, 'supersecret', function(err, decoded) {
        const getToken = localStorage.getKey('tokens', req.query.userName);
        if (err || getToken !== token) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        stripe.charges(req, res);
    });
});
module.exports = router;