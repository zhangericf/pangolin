const express = require('express');
var ObjectId = require('mongoose').Types.ObjectId;
var router = express.Router();
var { Pangolin } = require('../Model/Pangolin');

// => localhost:3000/api/
router.get('/', (req, res) => {
  Pangolin.find((err, docs) => {
    if (!err) {
      res.send(docs);
    } else
      console.log('Error retriving Pangolins : '
      + JSON.stringify(err, undefined, 2));
  });
});

router.get('pangolin/:id', (req, res) => {
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

router.post('/register', async (req, res) => {
	// confirm that user typed same password twice
	if (req.body.password !== req.body.passwordConf) {
		var err = new Error('Passwords do not match.');
		err.status = 400;
		res.send("passwords don't match");
		return next(err);
	}

	const { username, password, age, famille, 
		nourriture, race, passwordConf } = req.body;

	if (username && password && age && famille 
		&& nourriture && race && passwordConf) {

		var pangolin = new Pangolin(req.body);
		console.log("registering...");
		Pangolin.nameExist(pangolin.username, (err, bool) => {
			if (err) {
				return next(err);
			} else if (!bool) {
				Pangolin.create(pangolin, function (err, user) {
					if (err) {
						return next(err);
					} else {
						return res.send(user);
					}
				});
			} else {
        console.log("nameExist");
        res.status(401).send('Username already used!');
      }
		});
	}
});

router.post('/auth', function (req, res, next) {
	if (req.body.username && req.body.password) {
		Pangolin.authenticate(req.body.username, req.body.password, function (error, user) {
			if (error || !user) {
				return next(res.status(401).send('Wrong name or password'));
			} else {
				return res.send(user);
			}
		});
	} else {
		var err = new Error('All fields required.');
		err.status = 400;
		return next(err);
	}
});

router.put('/:id', (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400)
    .send(`No record with given id : ${req.params.id}`);

  var pangolin = {
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

router.put('/addFriend/:id', (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400)
    .send(`No record with given id : ${req.params.id}`);

  const friends = [].concat(req.body.friends);
  friends.push(req.params.id);

  var pangolin = {
    friends: friends,
  }

  Pangolin.findByIdAndUpdate(req.body._id,
    { $set: pangolin }, { new: true }, (err, doc) => {
    if (!err)
      res.send(doc);
    else
      console.log('Error adding friend Pangolins : '
      + JSON.stringify(err, undefined, 2));
  });
});


router.put('/removeFriend/:id', (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400)
    .send(`No record with given id : ${req.params.id}`);

  const friends = [].concat(req.body.friends);

  const index = friends.indexOf(req.params.id);
  friends.splice(index, 1);

  var pangolin = {
    friends: friends,
  }

  Pangolin.findByIdAndUpdate(req.body._id,
    { $set: pangolin }, { new: true }, (err, doc) => {
    if (!err)
      res.send(doc);
    else
      console.log('Error removing friend Pangolins : '
      + JSON.stringify(err, undefined, 2));
  });
});


module.exports = router;
