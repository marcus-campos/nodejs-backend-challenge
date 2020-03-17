const express = require('express');
const router = express.Router();
const MessageController = require("@controllers/message")

router.get('/rooms/:id', MessageController.index);
router.post('/', MessageController.store);

module.exports = router;
