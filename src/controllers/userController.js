import React from 'react';
import history from '../history';
import ReactDOM from 'react-dom';
import session from "express-session";


import Signup from '../views/Signup';
import Login from '../views/Login';


//AIRTABLE HELPERS
const Airtable = require('airtable');
const bcrypt = require('bcryptjs');
const data = require('./dataController.js');

const base = new Airtable({
  apiKey: process.env.REACT_APP_AIRTABLE_API_KEY,
}).base(process.env.REACT_APP_AIRTABLE_BASE_ID);
const table = base('contributors');


const findUser = async (email, name) => {
  let recordExists = false;
  const options = {
    filterByFormula: `OR(email = '${email}', name = '${name}')`,
  };

  const users = await data.getAirtableRecords(table, options);

  users.filter(user => {
    if (user.get('email') === email || user.get('name') === name) {
      return (recordExists = true);
    }
    return (recordExists = false);
  });

  return recordExists;
};


//USER MANAGEMENT
export const addUser = async (req, next) => {

  const { email, name } = req;
  const userExists = await findUser(email, name);

  if (userExists) {
    ReactDOM.render(<Signup type={'info'} message={'Username or Email already exists! Try to login.'}/>, document.getElementById('root'))
    return;
  }

  table.create(
    {
      email,
      name,
    },
    function(err, record) {
      if (err) {
        console.error(err);
        return;
      }
      //console.log(record)
      req.id = record.getId();
      next(req);
    }
  );
};

export const storePassword = (req) => {
  const { password, id } = req;

  bcrypt.hash(password, 10, function(err, hash) {
    if (err) {
      console.error(err);
      return;
    }

    table.update(
      id,
      {
        password: hash,
      },
      function(err) {
        if (err) {
          console.error(err);
          return;
        }
        // res.render('login', {
        //   message: 'Your account has been created!',
        // });
        //ReactDOM.render(<Signup type={'success'} message={'Your account has been created!'}/>, document.getElementById('root'))
        history.push({
          pathname: '/profile'
        })

      }
    );
  });
};

export const authenticate = (req) => {
  const { email, password } = req;
  const options = {
    filterByFormula: `OR(email = '${email}', name = '${email}')`,
  };

  data
    .getAirtableRecords(table, options)
    .then(users => {
      users.forEach(function(user) {
        bcrypt.compare(password, user.get('password'), function(err, response) {
          if (response) {
            // Passwords match, response = true
            localStorage.setItem('userSession', JSON.stringify(user.fields));
            //res.redirect("/profile");
            history.push({ pathname: '/profile' })

          } else {
            // Passwords don't match
            ReactDOM.render(<Login type={'error'} message={'Passwords dont match'}/>, document.getElementById('root'))
          }
        });
      });
    })
    .catch(err => {
      console.log(Error(err));
    });
};


export const isLoggedIn = (req, next) => {
  if (localStorage.getItem('userSession')) {
    return;
  }
  //If session dont exist redirect to Login
  ReactDOM.render(<Login />, document.getElementById('root'))
  history.push({ pathname: '/login' })
};
