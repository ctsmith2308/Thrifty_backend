let express = require('express');
let router = express.Router();
let service_account = require('../FBAdminSDK.json') // import service_account account config found in FireBase sdk account
let dbURL = require('../dbURL') // import db url found in FireBase sdk service account config

// get set up instructions from FB cog next to project overview in project settings
admin.initializeApp({
  credential: admin.credential.cert(service_account),
  databaseURL: dbURL
});

// GET user info based on token credentials.
router.get('/:id', (req, res, next) => {
  let tokenHeader = req.headers['x-access-token']
  if(tokenHeader){
    admin.auth().verifyIdToken(req.params.id)
    .then(decodedToken => {
      let uid = decodedToken.uid
      knex('users')
      .select('id')
      .where('uid', uid)
      .then(data => {
        res.send(data[0])
      })
      .catch(error ={
        res.send(error)
      })
    })
    .catch(error => {
      // if invalid token
      res.status(403).send({message:'Access Denied'})
    })
  } else {
    // if no token is present in header
    return res.status(403).send({message:'Access Denied'})
  }
});

// POST new user
router.post('/', (req, res, next) => {
  let tokenHeader = req.headers['x-access-token']
  if(tokenHeader){
    admin.auth().verifyIdToken(req.body.token)
    .then(decodedToken => {
      let email = decodedToken.email
      let uid = decodedToken.uid
      let postBody = {
        email,
        uid
      }
      knex('users')
      .insert(postBody)
      .returning('id')
      .then(data => {
        res.send(data[0])
      })
      .catch(error => {
        res.send(error)
      })
    })
    .catch(error=>{
      // if invalid token
      res.status(403).send({message:'Access Denied'})
    })
  } else {
    // if no token is present in header
    return res.status(403).send({message:'Access Denied'})
  }
})

module.exports = router;
