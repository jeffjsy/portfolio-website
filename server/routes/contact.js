let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
const contact = require('../models/contact');

// connect to our contact model
let Contact = require('../models/contact');

let contactController = require('../controllers/contact');

/* GET route for the contact list - READ operation*/
router.get('/', contactController.displayContactList);

/* GET route for displaying the Add page - CREATE operation */
router.get('/add', contactController.displayAddPage);

/* GET route for processing the Add page - CREATE operation */
router.post('/add', contactController.processAddPage);

/* POST route for displaying Edit page - UPDATE operation */
router.get('/edit/:id', contactController.displayEditPage);

/* GET route for processing the Edit page - UPDATE operation */
router.post('/edit/:id', contactController.processEditPage);

/* GET to preform Deletion - DELETE operation */
router.get('/delete/:id', contactController.performDelete);


module.exports = router;

