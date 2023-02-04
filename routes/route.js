const express = require('express');
router = express.Router();
controller = require('../controllers/controller');

router.get('/', controller.main);

module.exports = router;