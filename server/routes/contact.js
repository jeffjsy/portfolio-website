let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
const contact = require('../models/contact');

let passport = require('passport');

// helper function for guard purposes 
function requireAuth(req, res, next) {
  // check if the user is logged in
  if(!req.isAuthenticated()){
    return res.redirect('/login');
  }
  next();
}


let contactController = require('../controllers/contact');

/* GET route for the contact list - READ operation*/
router.get('/', contactController.displayContactList);

/* GET route for displaying the Add page - CREATE operation */
router.get('/add', requireAuth, contactController.displayAddPage);

/* GET route for processing the Add page - CREATE operation */
router.post('/add', requireAuth, contactController.processAddPage);

/* POST route for displaying Edit page - UPDATE operation */
router.get('/edit/:id', requireAuth, contactController.displayEditPage);

/* GET route for processing the Edit page - UPDATE operation */
router.post('/edit/:id', requireAuth, contactController.processEditPage);

/* GET to preform Deletion - DELETE operation */
router.get('/delete/:id', requireAuth, contactController.performDelete);


module.exports = router;

