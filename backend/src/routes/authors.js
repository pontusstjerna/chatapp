const express = require('express');
const router = express.Router();

const Author = require('../models/author');

router.get('/', function(req, res, next) {
  Author.find()
    .then(authors => {
      res.json(authors);
    })
    .catch(err => {
      res.status(500).json(err);
    })
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
