const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController.js');
const adminController = require('../controllers/adminController.js');

router.get('/', function(req, res){
    homeController.index(req, res);
});
router.post('/permit', function(req, res){
    homeController.store(req, res);
});
router.get('/auth', function(req, res){
    adminController.login(req, res);
});

module.exports = router;