const express = require('express');
var ObjectId = require('mongoose').Types.ObjectId;
var router = express.Router();

const auth = require('../Middleware/auth');
var { Pangolin } = require('../Model/Pangolin');

// => localhost:3000/pangolins/
router.get('/', (req, res) => {
  Pangolin.find((err, docs) => {
    if (!err) {
      res.send(docs);
    } else
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

router.post('/register', async (req, res) => {
	if (req.body.username &&
		req.body.password &&
		req.body.age &&
		req.body.famille &&
		req.body.nourriture &&
		req.body.race) {
		const pangolin = new Pangolin(req.body);
		await pangolin.save( async (err, pango) => {
			if (!err) {
			const token = await pango.generateAuthToken();
			res.status(201).send({ pango, token });
			} else {
			console.log('Error creating Pangolins : '
			+ JSON.stringify(err, undefined, 2));
			}
		});
	}
});

router.post('/auth', async(req, res) => {
  try {
    const { username, password } = req.body
    const user = await Pangolin.authenticate(username, password)
    if (!user) {
        return res.status(401).send({error: 'Login failed! Check authentication credentials'})
    }
    const token = await user.generateAuthToken()
    res.send({ user, token })
  } catch (error) {
    res.status(400).send(error)
  }
});


router.get('/my/profile', auth, async(req, res) => {
  // View logged in user profile
  res.send(req.user)
})

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
