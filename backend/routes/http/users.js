const express = require('express');
const router = express.Router();
const UserController = require("@controllers/user")

router.get('/', UserController.index);
router.post('/', UserController.store);

module.exports = router;
