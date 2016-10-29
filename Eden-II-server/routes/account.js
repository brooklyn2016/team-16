var express = require('express');
var router = express.Router();

router.get('/login', function(req, res) {
   res.send('<html><body><form method="post"><input type="text" name="username"></form></body></html>');
});

router.post('/login', function(req, res, next) {
    console.log(req.body);
});

module.exports = router;