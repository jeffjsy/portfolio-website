let express = require('express');
let router = express.Router();

let indexController = require('../controllers/index');

//change these render
/* GET Landing page. */
router.get('/', indexController.displayHomePage);

/* GET Home page. */
router.get('/home', indexController.displayHomePage);

/* GET About me page. */
router.get('/about', indexController.displayAboutPage);

/* GET Projects page. */
router.get('/projects', indexController.displayProjectsPage);

/* GET Services page. */
router.get('/services', indexController.displayServicesPage);

/* GET Contact Us page. */
router.get('/contact', indexController.displayContactPage);




/* GET route for displaying the Login page */
router.get('/login', indexController.displayLoginPage);

/* GET route for processing the Login page */
router.post('/login', indexController.processLoginPage);

/* GET route for displaying the Register page */
router.get('/register', indexController.displayRegisterPage);

/* GET route for processing the Register page */
router.post('/register', indexController.processRegisterPage);

/* GET to preform User Logout */
router.get('/logout', indexController.performLogout);


module.exports = router;
