const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const techmbook_controller = require('../controllers/techmbook.controller');
router.post('/add', techmbook_controller.register);
router.post('/login', techmbook_controller.login);
router.post('/username', techmbook_controller.username);
router.post('/addpost', techmbook_controller.addpost);
router.get('/getpost', techmbook_controller.getpost);
router.delete('/delete/:id', techmbook_controller.deletepost);
router.post('/update/:id', techmbook_controller.editpost);





// a simple test url to check that all of our files are communicating correctly.
router.get('/test', techmbook_controller.test);
module.exports = router;
