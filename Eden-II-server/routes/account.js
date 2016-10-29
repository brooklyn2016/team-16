var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/login', function(req, res, next) {
   res.send('<html><body><form method="post"><input type="text" name="username"></form></body></html>');
});

router.post('/login', passport.authenticate('local'), function(req, res, next) {
    res.send(req.user);
});

module.exports = router;