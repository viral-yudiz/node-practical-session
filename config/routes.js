var Admin = require('express').Router();
var User = require('express').Router();
var Users = require("../controllers/UsersController");

/**
 * User Controller Routes For Admin API Usage
 */

Admin.get('/users', Users.index);
Admin.get('/users/:id(\\d+)/', Users.show);
Admin.get('/users/:id(\\d+)/status/', Users.status);
Admin.post('/users', Users.store);
Admin.patch('/users/:id(\\d+)/', Users.update);
Admin.delete('/users/:id(\\d+)/', Users.destroy);

/**
 *  User Controller Routes For User API Usage
 */

User.post('/login', Users.login);

module.exports = {
    Admin: Admin,
    User: User
}