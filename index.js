'use strict';
var ghGot = require('gh-got');

module.exports = function (email, token) {
	if (typeof email !== 'string' || email.indexOf('@') === -1) {
		throw new Error('`email` required');
	}

	return ghGot('search/users', {
		token: token,
		query: {
			q: email + ' in:email'
		},
		headers: {
			'user-agent': 'https://github.com/sindresorhus/github-username'
		}
	}).then(function (result) {
		var data = result.body;

		if (data.total_count === 0) {
			throw new Error('Couldn\'t find a username for the supplied email');
		}

		return data.items[0].login;
	});
};
