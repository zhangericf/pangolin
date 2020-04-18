const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

var PangolinSchema = new mongoose.Schema({
	username: { type: String, require: true },
	password: { type: String, require: true },
	age: { type: Number, require: true },
	famille: { type: String, require: true },
	race: { type: String, require: true },
	nourriture: { type: String, require: true },
	friends: [{ type: String }],
});

PangolinSchema.pre('save', function (next) {
	var pangolin = this;
	bcrypt.hash(pangolin.password, 10, function (err, hash){
		if (err) {
			return next(err);
		}
		pangolin.password = hash;
		next();
	});
});

PangolinSchema.statics.nameExist = function (username, callback) {
	Pangolin.findOne( { username: username } ).exec( (err, user) => {
		if(err)
			return callback(err);
		if (user == null) {
			return callback(null, false);
		}
		return callback(null, true);
	});
};

PangolinSchema.methods.addFriend = async function(pangolin_id) {
    // Generate an auth token for the user
	const user = this;
	console.log(user);
	console.log(pangolin_id);
    user.friends = user.friends.concat({pangolin_id});
	await user.save();
	return user;
};

PangolinSchema.statics.authenticate = function (username, password, callback) {
	Pangolin.findOne({ username: username }).exec(function (err, user) {
		if (err) {
		  return callback(err);
		} else if (!user) {
		  var err = new Error('User not found.');
		  err.status = 401;
		  return callback(err);
		}
		bcrypt.compare(password, user.password, function (err, result) {
		  if (result === true) {
			return callback(null, user);
		  } else {
			return callback();
		  }
		});
	});
};

var Pangolin = mongoose.model('Pangolin', PangolinSchema);

module.exports = { Pangolin };