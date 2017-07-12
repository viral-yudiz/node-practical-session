const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');

const Routes = require("./config/routes");
var Admin = Routes.Admin;
var User = Routes.User;

const PORT = 3333;

var app = express();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.use('/api/admin', Admin);
app.use('/api/user', User);

app.use("*", (req, res) => {

    res.status(404).json({
        message: "Route Not Found"
    });

});

app.listen(PORT, () => {
    console.log(`Server Started @ http://localhost:${PORT}`);
});