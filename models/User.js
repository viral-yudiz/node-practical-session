var db = require('../config/database');
var util = require('util');

class User {

    all(callback) {
        db.query("CALL getAllUsers()", (err, result, fields) => {

            if (err) {
                callback({
                    message: "Internal Server Error",
                    status: 500
                });
            }

            if (result[0]) {

                callback({
                    status: 200,
                    data: result[0],
                    message: "Users List"
                });
            }
        });
    }

    get(id, callback) {
        db.query("CALL getUser(?)", [id], (err, result, fields) => {

            if (err) {
                callback({
                    message: "Internal Server Error",
                    status: 500
                });

            } else if (result[0][0]) {

                callback({
                    status: 200,
                    data: result[0][0],
                    message: "User Details"
                });

            } else {

                callback({
                    message: "User Not Found",
                    status: 404
                });
            }
        });
    }

    login(req, callback) {
        req.checkBody('email', 'Email is required').notEmpty();
        req.checkBody('email', 'Please Provide Valid Email').isEmail();
        req.checkBody('password', 'Password is required').notEmpty();

        req.getValidationResult().then(function (result) {
            if (!result.isEmpty()) {
                callback({
                    message: "Validation Errors",
                    data: result.array(),
                    status: 400
                });

            } else {

                db.query("CALL userLogin(?,?)", [req.body.email, req.body.password], (err, result, fields) => {

                    if (err) {
                        callback({
                            message: "Internal Server Error",
                            status: 500
                        });

                    } else if (result[0][0]) {

                        callback({
                            status: 200,
                            data: result[0][0],
                            message: "Login Successfull"
                        });

                    } else {

                        callback({
                            message: "Wrong Email or Password",
                            status: 400
                        });
                    }
                });
            }

        });
    }

    save(req, callback) {
        req.checkBody('firstname', 'First Name is required').notEmpty();
        req.checkBody('firstname', 'Please enter valid First Name').isAlpha();
        req.checkBody('lastname', 'Last Name is required').notEmpty();
        req.checkBody('lastname', 'Please enter valid Last Name').isAlpha();
        req.checkBody('email', 'Email is required').notEmpty();
        req.checkBody('email', 'Please Provide Valid Email').isEmail();
        req.checkBody('password', 'Password is required').notEmpty();

        req.getValidationResult().then(function (result) {
            if (!result.isEmpty()) {
                callback({
                    message: "Validation Errors",
                    data: result.array(),
                    status: 400
                });

            } else {
                db.query("CALL addUser(?,?,?,?)", [req.body.firstname, req.body.lastname, req.body.email, req.body.password], (err, result, fields) => {

                    if (!err) {
                        if (result[0][0]) {
                            callback({
                                data: result[0][0],
                                message: "User Added Successfully",
                                status: 200
                            });
                        } else {
                            callback({
                                message: "can't Add User",
                                status: 400
                            });
                        }
                    } else {

                        callback({
                            message: "DataBase Error",
                            status: 500
                        });
                    }
                });
            }

        });
    }

    delete(id, callback) {
        db.query("CALL deleteUser(?)", [id], (err, result, fields) => {
            if (err) {
                callback({
                    status: 400,
                    message: "Database Error"
                });
            } else {
                if (result.affectedRows) {
                    callback({
                        status: 200,
                        message: "User Deleted Successfully"
                    });
                }
                callback({
                    status: 404,
                    message: "User Not Found"
                });
            }
        });
    }

    status(id, callback) {
        db.query("CALL changeStatus(?)", [id], (err, result, fields) => {

            if (err) {
                callback({
                    message: "Internal Server Error",
                    status: 500
                });

            } else if (result.affectedRows) {

                callback({
                    status: 200,
                    message: "User status updates"
                });

            } else {

                callback({
                    message: "can't update user status. try again",
                    status: 404
                });
            }
        });
    }

    update(id, req, callback) {

        db.query("CALL getUser(?)", [id], (err, result, fields) => {

            if (err) {
                callback({
                    message: "Internal Server Error",
                    status: 500
                });

            } else if (result[0][0]) {

                let firstname = req.body.firstname || result[0][0].firstname;
                let lastname = req.body.lastname || result[0][0].lastname;

                db.query("CALL updateUser(?,?,?)", [id, firstname, lastname], (update_err, update_result, fields) => {

                    if (update_err) {
                        callback({
                            message: "Internal Server Error",
                            status: 500
                        });

                    } else if (update_result.affectedRows) {

                        callback({
                            status: 200,
                            data: {
                                id: id,
                                firstname: firstname,
                                lastname: lastname,
                                email: result[0][0].email
                            },
                            message: "User Details Updated Successfully"
                        });

                    } else {

                        callback({
                            message: "can't update user status. try again",
                            status: 404
                        });
                    }
                });

            } else {

                callback({
                    message: "User Not Found",
                    status: 404
                });
            }
        });
    }
}

module.exports = new User();