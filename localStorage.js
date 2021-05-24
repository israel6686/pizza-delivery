
const LocalStorage = require('node-localstorage').LocalStorage;

let storage={
    users : new LocalStorage('./users'),
    tokens:   new LocalStorage('./tokens')
};

function getKey(type, key){
    return storage[type].getItem(key);
}

function setKey(type, key, value){
    storage[type].setItem(key,value);
}

function removeKey(type, key){
    storage[type].removeItem(key);
}

exports.getKey = getKey;
exports.setKey = setKey;
exports.removeKey = removeKey;