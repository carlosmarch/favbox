import history from '../history';

const bcrypt = require('bcryptjs');
const data = require('./dataController');

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
    history.push({
      pathname: '/signup',
      state: {
        type: 'error',
        message: 'Username or Email already exists!'
      }
    })
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
      //Add id to user data record
      record.fields['id'] = record.id
      setSession(record.fields)

      req.id = record.getId();
      next(req);//Store Pass method called from Signup.js
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
        history.push({
          pathname: '/profile',
          state: {
            type: 'success',
            message: 'Your account has been created!!'
          }
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
      if(!users.length){
        // Not registered
        history.push({
          pathname: '/login',
          state: {
            type: 'info',
            message: 'That email is not registered... Try to signup!'
          }
        })
      }
      users.forEach(function(user) {
        bcrypt.compare(password, user.get('password'), function(err, response) {
          if (response) {
            // Passwords match, response = true
            //ADD ID TO USER SESSION INFO
            user.fields['id'] = user.id
            setSession(user.fields)

            history.push({
              pathname: '/profile',
              state: {
                type: 'info',
                message: 'Logged in!'
              }
            })

          } else {
            // Passwords don't match
            //console.log('authenticate','Passwords dont match')
            history.push({
              pathname: '/login',
              state: {
                type: 'error',
                message: 'Passwords dont match'
              }
            })

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
        //console.log(user, user.fields.likes)
        return user;
      });
    })
    .catch(err => {
      console.log( Error(err));
    });
}


export const updateUserLikes = (likeArr) => {
  const userId = getSession()?.id
  console.log('updateUserLikes', userId, likeArr)
  if (!userId) return;
  table.update(
    userId,
    {
      likes: likeArr,
    },
    function(err) {
      if (err) {
        console.error(err);
        return;
      }
    }
  );
}


export const setLocalStorageFavs = (likeArr) => {
  if ( typeof(likeArr) === 'undefined') return
  //clear storage favs
  removeStorageFavs()
  for( const id of likeArr) {
    localStorage.setItem(id, true);
  }
}

// @LOCALSTORAGE
// User Session Helpers
//
export const setSession = (userRecord) => {
  //Arrives user.fields
  delete userRecord.password //Don´t store encrypted pass
  localStorage.setItem('userSession', JSON.stringify(userRecord));
}

export const getSession = () => {
  return JSON.parse(localStorage.getItem('userSession'));
}

export const isAuthenticated = () => {
  if( localStorage.getItem('userSession') === null ){
    return false
  }else{
    return true
  }
}

export const signOut = () =>{
  localStorage.clear();
  history.push({
    pathname: '/'
  })
}

export const removeStorageFavs = () =>{
  //Get userSession, delete  all the rest & Set Session again
  let userSession = JSON.parse(localStorage.getItem('userSession'));
  localStorage.clear();
  localStorage.setItem('userSession', JSON.stringify(userSession));
}

//@LOCALSTORAGE
//DATA HELPERS NOT USED
export const setStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
}
export const getStorage = (key) => {
  return JSON.parse(localStorage.getItem(key));
}
