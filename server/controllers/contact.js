let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

//create a reference to the model
let Contact = require('../models/contact');

module.exports.displayContactList = (req, res, next) => {
  Contact.find((err, contactList) => {
    if(err){
        return console.error(err);
    } else {        
        res.render('contact/list', 
        {title: 'Contact List', ContactList: contactList, 
        displayName: req.user ? req.user.displayName : ''});
    }
  });
}

module.exports.displayAddPage = (req, res, next) => {
  res.render('contact/add', {title: 'Add Contact', 
  displayName: req.user ? req.user.displayName : ''})
}

module.exports.processAddPage = (req, res, next) => {
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
}

module.exports.displayEditPage = (req, res, next) => {
  let id = req.params.id;

  Contact.findById(id, (err, contactToEdit) => {
    if(err){
      console.log(err);
      res.end(err);
    } else {
      // show the edit view
      res.render('contact/edit', {title: 'Edit Contact', contact: contactToEdit, 
      displayName: req.user ? req.user.displayName : ''})
    }
  });
}

module.exports.processEditPage = (req, res, next) => {
  let id = req.params.id
  let  updatedContact = Contact({
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
}

module.exports.performDelete = (req, res, next) => {
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
}






