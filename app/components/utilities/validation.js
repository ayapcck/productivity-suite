'use strict';
var crypto = require('crypto');
var React = require('react');

function generateSalt(len) {
	return crypto.randomBytes(Math.ceil(len/2)).toString('hex').slice(0, len);
}

function generateHmac(password, salt) {
	var hash = crypto.createHmac('sha512', salt);
	hash.update(password);
	return hash.digest('hex');
}

export { generateSalt, generateHmac };