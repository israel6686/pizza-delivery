const express = require('express');
const app = express();

app.use(require('./manage_users'));
app.use(require('./authController'));

app.listen(6666, ()=> {console.log("lising to port 6666")});

