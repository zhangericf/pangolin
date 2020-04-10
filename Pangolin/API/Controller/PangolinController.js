const express = require('express');
var ObjectId = require('mongoose').Types.ObjectId;
var router = express.Router();

var { Pangolin } = require('../Model/Pangolin');

// => localhost:3000/pangolins/
router.get('/', (req, res) => {
  Pangolin.find((err, docs) => {
    if (!err)
      res.send(docs);
    else
      console.log('Error retriving Pangolins : '
      + JSON.stringify(err, undefined, 2));
  });
});

router.get('/:id', (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400)
    .send(`No record with given id : ${req.params.id}`);

  Pangolin.findById(req.params.id, (err, docs) => {
    if (!err)
      res.send(docs);
    else
      console.log('Error retriving Pangolins : '
      + JSON.stringify(err, undefined, 2));
  });
});

router.post('/register', (req, res) => {
  var pangolin = new Pangolin({
    username: req.body.username,
    password: req.body.password,
    age: req.body.age,
    famille: req.body.famille,
    race: req.body.race,
    nourriture: req.body.nourriture,
  });
  pangolin.save((err, doc) => {
    if (!err)
      res.send(doc);
    else
      console.log('Error retriving Pangolins : '
      + JSON.stringify(err, undefined, 2));
  });
});

router.post('/authenticate', (req, res) => {
  var pangolin = Pangolin.findOne( { username: req.body.username }, (err, docs, pangolin) => {
    if (!err) {
      res.send(docs);
    } else
      console.log('Error username Pangolins : '
      + JSON.stringify(err, undefined, 2));
  });
  if (pangolin.password == req.body.password)
    return status(200);
  else
    return status(400);
});

router.put('/:id', (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400)
    .send(`No record with given id : ${req.params.id}`);

  var pangolin = {
    username: req.body.username,
    password: req.body.password,
    age: req.body.age,
    famille: req.body.famille,
    race: req.body.race,
    nourriture: req.body.nourriture,
  }

  Pangolin.findByIdAndUpdate(req.params.id,
    { $set: pangolin }, { new: true }, (err, doc) => {
    if (!err)
      res.send(doc);
    else
      console.log('Error retriving Pangolins : '
      + JSON.stringify(err, undefined, 2));
  });
});

router.delete('/:id',(req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400)
    .send(`No record with given id : ${req.params.id}`);

  Pangolin.findByIdAndDelete(req.params.id, (err, doc) => {
    if (!err)
      res.send(doc);
    else
      console.log('Error retriving Pangolins : '
      + JSON.stringify(err, undefined, 2));
  });
});

module.exports = router;
