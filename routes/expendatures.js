let express = require('express');
let router = express.Router();
let knex = require('../knex')

router.get('/:id', (req, res, next)=>{
  if(req.headers['x-access-token']){
    knex('budget')
    .where('user_id', req.params.id)
    .select('*')
    .then(data=>{
      res.send(data[0])
    })
    .catch(error=>{
      res.send(error)
    })
  } else {
    return res.status(403).send({message:'Access-Denied'})
  }
})

router.post('/', (req, res, next) => {
  if(req.headers['x-access-token']) {
    knex('budget')
    .insert(req.body,'*')
    .then(data => {
      res.send(data)
    })
    .catch(error => {
      res.send(error)
    })
  } else {
    return res.status(403).send({message:'Access-Denied'})
  }
})

router.post('/add', (req, res, next) => {
  if(req.headers['x-access-token']) {
    knex('expendatures')
    .where('user_id', req.body.user_id)
    .increment(req.body.category, 10)
    .then(data => {
      res.sendStatus(200)
    })
    .catch(error => {
      res.send(error)
    })
  } else {
    return res.sendStatus(403)
  }
})

module.exports = router
