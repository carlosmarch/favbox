import React from 'react';
import history from '../history';
import ReactDOM from 'react-dom';

import Signup from '../views/Signup';
import Login from '../views/Login';

const bcrypt = require('bcryptjs');
const data = require('./dataController.js');

//AIRTABLE HELPERS
const Airtable = require('airtable');
const base = new Airtable({
  apiKey: process.env.REACT_APP_AIRTABLE_API_KEY,
}).base(process.env.REACT_APP_AIRTABLE_BASE_ID);
const table = base('contributors');


//USER METHODS
const findUser = async (email, name) => {
  let recordExists = false;
  let options = {};
  if (email && name) {
    options = {
      filterByFormula: `OR(email = '${email}', name = '${name}')`
    };
  } else {
    options = {
      filterByFormula: `OR(email = '${email}', name = '${email}')`
    };
  }

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

      //console.log('STORE',record.fields)
      record.fields['id'] = record.id
      setSession(record.fields)

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
            //console.log('STORE',record.fields)
            user.fields['id'] = user.id
            setSession(user.fields)
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

export const getUserByEmail = (req, next) => {
  const options = {
    filterByFormula: `OR(email = '${req}', name = '${req}')`
  }
  data.getAirtableRecords(table, options)
    .then( users => {
      //console.log(users)
      users.forEach(function(user) {
        console.log(user, user.fields.likes)
        return user;
      });
    })
    .catch(err => {
      console.log( Error(err));
    });
}


export const setSession = (userRecord) => {
  //user.fields
  localStorage.setItem('userSession', JSON.stringify(userRecord));
}





















///////
//////
/////@TODO RESET PASSWORD

export const isLoggedIn = (req, next) => {
  if (localStorage.getItem('userSession')) {
    return;
  }
  //If session dont exist redirect to Login
  ReactDOM.render(<Login />, document.getElementById('root'))
  history.push({ pathname: '/login' })
};


// Built in node module provides utilities for parsing and formatting URL query strings
const querystring = require("querystring");
// The token will be using the user's ID and email address to generate a random string
const generateToken = (id, email) => {
  const source = `${id}${email}`;
  let token = "";
  for (let i = 0; i < source.length; i++) {
    token += source.charAt(Math.floor(Math.random() * source.length));
  }
  return token;
};
const generateResetUrl = (token, email) => {
  let url = "";
  url = `login/resetlink/${token}?${querystring.stringify({ email })}`;
  return url;
};


export const addToken = async (req, res, next) => {
  const { name } = req.body;
  // Check that the user exists. We wrote this helper function already in Part 1 but we need to refactor as it requires two parameters and we are only including one here
  const userExists = await findUser(name);
  if (userExists) {
    // res.render("login", {
    //   message: "Username or Email already exists!"
    // });
    ReactDOM.render(<Login type={'info'} message={'Username or Email already exists!'}/>, document.getElementById('root'))
    return;
  }
  const options = {
    filterByFormula: `OR(email = '${name}', name = '${name}')`
  };
  // Get the user
  const users = await data.getAirtableRecords(table, options);
  const user = users.map(record => ({
    id: record.getId(),
    email: record.get("email")
  }));
  const token = generateToken(user[0].id, user[0].email);
  table.update(
    user[0].id,
    {
      token
    },
    (err, record) => {
      if (err) {
        console.error(err);
      }
      req.body.url = generateResetUrl(token, user[0].email);
      req.body.to = user[0].email;
      next();
    }
  );
};

const nodemailer = require("nodemailer");

export const sendEmail = async (req, res) => {
  const subject = "Password Reset link for My Sweet App";
  const { url, to } = req.body;
  const body = `Hello,
  You requested to have your password reset. Ignore if this is a mistake or you did not make this request. Otherwise, click the link below to reset your password.
  <a href="http://localhost:3000//${url}">Reset My Password</a>
  You can also copy and paste this link in your browser URL bar.
  <a href="http://localhost:3000//${url}">http://localhost:3000//${url}</a>`;
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    // secure: true,
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD
    }
  });
  const mailOptions = {
    from: process.env.FROM_EMAIL,
    to,
    subject,
    html: body
  };
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      // email sent
      res.render("forgot", {
        message: "Please check your email for your password reset link"
      });
    }
  });
};
