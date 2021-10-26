let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
const contact = require('../models/contact');

let jwt = require('jsonwebtoken');

let passport = require('passport');

let contactController = require('../controllers/contact');

// helper function for guard purposes 
function requireAuth(req, res, next) {
  // check if the user is logged in
  if(!req.isAuthenticated()){
    return res.redirect('/login');
  }
  next();
}




/* GET route for the contact list - READ operation*/
router.get('/', requireAuth, contactController.displayContactList);  

/* GET route for displaying the Add page - CREATE operation */
router.get('/add', requireAuth, contactController.displayAddPage);

/* GET route for processing the Add page - CREATE operation */
router.post('/add', requireAuth, contactController.processAddPage);

/* POST route for displaying Update page - UPDATE operation */
router.get('/update/:id', requireAuth, contactController.displayUpdatePage);

/* GET route for processing the Update page - UPDATE operation */
router.post('/update/:id', requireAuth, contactController.processUpdatePage);

/* GET to preform Deletion - DELETE operation */
router.get('/delete/:id', requireAuth, contactController.performDelete);


module.exports = router;

