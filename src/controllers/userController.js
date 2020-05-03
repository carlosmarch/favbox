import history from '../history';

const bcrypt = require('bcryptjs');
const data = require('./dataController');

//AIRTABLE HELPERS
const Airtable = require('airtable');
const base = new Airtable({
  apiKey: process.env.REACT_APP_AIRTABLE_API_KEY,
}).base(process.env.REACT_APP_AIRTABLE_BASE_ID);
const table = base('contributors');
const tablePrivate = base('contributorsPrivate');

//USER METHODS
const findUser = async (email) => {
  let recordExists = false;
  let options = { filterByFormula: `(email = '${email}')` };

  const users = await data.getAirtableRecords(tablePrivate, options);
  users.filter(user => {
    if (user.get('email') === email) {
      return (recordExists = true);
    }
    return (recordExists = false);
  });

  return recordExists;
};


//USER MANAGEMENT
export const addUser = async (req, next) => {
  const { email, name } = req;
  const userExists = await findUser(email);
  if (userExists) {
    history.push({
      pathname: '/signup',
      state: {
        type: 'error',
        message: 'Email already exists!'
      }
    })
    return;
  }
  table.create( { name }, function(err, record) {
      //CREATE USER NAME
      if (err) {
        console.error(err);
        return;
      }
      record.fields['id'] = record.id
      setSession(record.fields)
      req.id = record.getId();
      let userData = [req.id] //Needs to be an object

      tablePrivate.create( { email, userData, }, function(err, record) {
          //CREATE PASS && MAIL IN PRIVATE TABLE
          if (err) {
            console.error(err);
            return;
          }
          req.id = record.getId();
          next(req);//Store Pass method called from Signup.js
      })


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

    tablePrivate.update( id, { password: hash, }, function(err) {
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
  const options = { filterByFormula: `(email = '${email}')` };

  data
    .getAirtableRecords(tablePrivate, options)
    .then(users => {
      //console.log(users)
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
            let userid = user.fields['userData'][0]
            //console.log('authenticate', user, userid)
            table.find(userid, (err, record) => {
                if (err) {
                  console.error(err)
                  return
                }
                //SESSION SHOULD BE PUBLIC DATA!!! Call table with id
                record.fields['id'] = record.id
                setSession(record.fields)

                history.push({
                  pathname: '/profile',
                  state: {
                    type: 'info',
                    message: 'Logged in!'
                  }
                })

            });

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


export const updateUserLikes = (likeArr) => {
  const userId = getSession()?.id
  //console.log('updateUserLikes', userId, likeArr)
  if (!userId) return;
  table.update( userId, { likes: likeArr, }, function(err) {
      if (err) {
        console.error(err);
        return;
      }
    }
  );
}


export const updateUserProfile = (req) => {
  console.log('updateUserProfile', req)
  const { name, description, avatar } = req;
  const userId = getSession()?.id
  if (!userId) return;
  table.update( userId, { name, description, avatar }, function(err, record) {
      if (err) {
        console.error(err);
        return;
      }
      record.fields['id'] = record.id
      setSession(record.fields)
      history.push({
        pathname: '/profile',
        state: {
          type: 'info',
          message: 'Profile updated successfully!'
        }
      })
    }
  );

}



// @LOCALSTORAGE
// User Session Helpers
//
export const setSession = (userRecord) => {
  //Arrives user.fields
  delete userRecord.private //Don´t store private key
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


export const setLocalStorageFavs = (likeArr) => {
  if ( typeof(likeArr) === 'undefined') return
  //clear storage favs
  removeStorageFavs()
  for( const id of likeArr) {
    localStorage.setItem(id, true); //@TODO Clean this inside of an array
  }
}


export const removeStorageFavs = () =>{
  //Get userSession, delete  all the rest & Set Session again
  let userSession = JSON.parse(localStorage.getItem('userSession'));
  localStorage.clear();
  localStorage.setItem('userSession', JSON.stringify(userSession));
}

//Returns an array of favorite items ID
export const  getStorageFavs = () => {
  var archive = [],
      keys = Object.keys(localStorage),
      i = 0, key;
  for (; key = keys[i]; i++) {
      archive.push( key );
  }
  //REMOVE USER SESSION FROM LIKES
  const filtered = archive.filter(item => item !== "userSession")
  const cleanArchive = filtered.filter(function (el) { return el != null; });
  return cleanArchive;
}
