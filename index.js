"use strict";
exports.__esModule = true;
var express_1 = require("express");
var users_1 = require("./users/users");
var port = 5000;
var app = (0, express_1["default"])();
app.route('/hello')
    .get(function (req, res) {
    res.send('Hello get');
})
    .post(function (req, res) {
    res.send('Hello post');
});
app.use('/users', users_1.usersRouter);
app.listen(port, function () {
    console.log("Server running on http://localhost:".concat(port));
});
