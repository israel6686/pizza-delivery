const express = require('express');
const router = express.Router();
const MANAGE_USER = "/manage_users";
const localStorage = require('./localStorage');

function User(userName, email, address) {
    const self = this;
    self.userName = userName;
    self.email = email;
    self.address = address;
}

function getUser(req, res){
    const user = localStorage.getKey('users', req.query.userName);
    res.status(200);
    res.send(user || "not found")
}

function insertUser(req, res){
    if (!req.query.email || !req.query.address){
        res.status(400);
        return res.send("missing mandatory params");
    }
    const user = new User(req.query.userName, req.query.email, req.query.address);
    localStorage.setKey('users', req.query.userName, JSON.stringify(user));
    res.status(200);
    res.send('ok')
}

function removeUser(req, res){
    let message = "user not found";
    const user = localStorage.getKey('users', req.query.userName);
    if (user){
        localStorage.removeKey('users', req.query.userName);
        message = "key deleted";
    }
    res.status(200);
    res.send(message)
}


router.use(function (req, res, next) {
    if (!req.query.userName){
        res.status(400);
        res.send("missing mandatory params")
    }
    else{
        next();
    }
});

router.route(MANAGE_USER)
    .get(getUser)
    .put(insertUser)
    .delete(removeUser);

module.exports = router;