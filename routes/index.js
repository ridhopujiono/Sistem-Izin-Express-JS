const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController.js');

router.get('/', function(req, res){
    homeController.index(req, res);
});
router.post('/permit', function(req, res){
    homeController.store(req, res);
});

module.exports = router;