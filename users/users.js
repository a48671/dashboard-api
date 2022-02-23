"use strict";
exports.__esModule = true;
exports.usersRouter = void 0;
var express_1 = require("express");
var usersRouter = (0, express_1.Router)();
exports.usersRouter = usersRouter;
usersRouter.post('/login', function (req, res) {
    res.send('login');
});
usersRouter.post('/register', function (req, res) {
    res.send('register');
});
