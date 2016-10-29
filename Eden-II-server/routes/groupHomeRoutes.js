var express = require('express');
var router = express.Router();
var groupHomeController = require('../controllers/groupHomeController.js');

/*
 * GET
 */
router.get('/', groupHomeController.list);

/*
 * GET
 */
router.get('/:id', groupHomeController.show);

/*
 * POST
 */
router.post('/', groupHomeController.create);

/*
 * PUT
 */
router.put('/:id', groupHomeController.update);

/*
 * DELETE
 */
router.delete('/:id', groupHomeController.remove);

module.exports = router;
