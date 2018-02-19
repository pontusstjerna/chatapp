const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  res.json({"message": "index route for rest api"});
});

module.exports = router;
