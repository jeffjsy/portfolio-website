let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
const contact = require('../models/contact');

// connect to our contact model
let Contact = require('../models/contact');

/* GET route for the contact list - READ operation*/

router.get('/', (req, res, next) => {
  Contact.find((err, contactList) => {
    if(err){
        return console.error(err);
    } else {
        
        res.render('contact/list', {title: 'Contact List', ContactList: contactList});
    }
  });
});

/* GET route for displaying the Add page - CREATE operation */
router.get('/add', (req, res, next) => {
  res.render('contact/add', {title: 'Add Contact'})
}); 

/* GET route for processing the Add page - CREATE operation */
router.post('/add', (req, res, next) => {
  let newContact = Contact({
    "username": req.body.username,
    "password": req.body.password,
    "email": req.body.email,
    "phonenumber": req.body.phonenumber
  });

  Contact.create(newContact, (err, Contact) => {
    if(err){
      console.log(err);
      res.end(err);
    } else {
      // refresh the Contact list
      res.redirect('/contact-list');
    }
  });
}); 

/* POST route for displaying Edit page - UPDATE operation */
router.get('/edit/:id', (req, res, next) => {
  let id = req.params.id;

  Contact.findById(id, (err, contactToEdit) => {
    if(err){
      console.log(err);
      res.end(err);
    } else {
      // show the edit view
      res.render('contact/edit', {title: 'Edit Contact', contact: contactToEdit})
    }
  });
}); 

/* GET route for processing the Edit page - UPDATE operation */
router.post('/edit/:id', (req, res, next) => {
  let id = req.params.id
  let  updatedContact= Contact({
    "_id": id, 
    "username": req.body.username,
    "password": req.body.password,
    "email": req.body.email,
    "phonenumber": req.body.phonenumber
  });

  Contact.updateOne({_id: id}, updatedContact, (err) => {
    if(err){
      console.log(err);
      res.end(err);
    } else {
      // refresh the list
      res.redirect('/contact-list');
    } 
  });
}); 

/* GET to preform Deletion - DELETE operation */
router.get('/delete/:id', (req, res, next) => {
  let id = req.params.id;

  Contact.remove({_id: id}, (err) => {
    if(err){
      console.log(err);
      res.end(err);
    } else {
      // refresh Contact list
      res.redirect('/contact-list');
    }
  });
}); 


module.exports = router;

