const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
   res.json({"NOT_IMPLEMENTED": "get all"});
});

router.get('/:id', function(req, res, next) {
   res.json({"NOT_IMPLEMENTED": "get single"});
});

router.post('/', function(req, res, next) {
   res.json({"NOT_IMPLEMENTED": "create"});
});

router.put('/', function(req, res, next) {
   res.json({"NOT_IMPLEMENTED": "update"});
});

router.delete('/', function(req, res, next) {
   res.json({"NOT_IMPLEMENTED": "delete"});
});

module.exports = router;
