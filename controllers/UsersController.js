var User = require('../models/user');

var response = {};

class Users {

    index(req, res) {

        User.all((data) => {
            res.status(data.status).json({
                message: data.message,
                data: data.data || {}
            });
        });
    }

    show(req, res) {
        let id = req.params.id;
        User.get(id, (data) => {
            res.status(data.status).json({
                message: data.message,
                data: data.data || {}
            });
        });
    }

    store(req, res) {

        let result = User.save(req, (data) => {
            res.status(data.status).json({
                message: data.message,
                data: data.data || {}
            });
        });
    }

    destroy(req, res) {
        let id = req.params.id;
        User.delete(id, (data) => {

            res.status(data.status).json({
                message: data.message,
                data: data.data || {}
            });
        });
    }

    login(req, res) {

        User.login(req, (data) => {
            res.status(data.status).json({
                message: data.message,
                data: data.data || {}
            });
        });
    }

    status(req, res) {
        let id = req.params.id;
        User.status(id, (data) => {
            res.status(data.status).json({
                message: data.message,
                data: data.data || {}
            });
        });
    }

    update(req, res) {
        let id = req.params.id;
        User.update(id, req, (data) => {
            res.status(data.status).json({
                message: data.message,
                data: data.data || {}
            });
        });
    }

};
module.exports = new Users();