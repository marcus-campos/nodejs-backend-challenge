const express = require('express');
const router = express.Router();
const RoomController = require("@controllers/room")

router.get('/', RoomController.index);
router.get('/:id', RoomController.show);
router.post('/', RoomController.store);

module.exports = router;
