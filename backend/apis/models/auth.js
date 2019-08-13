/**
 * Configuration.
 */

let config = {
	clients: [{
		id: 'application',	// TODO: Needed by refresh_token grant, because there is a bug at line 103 in https://github.com/oauthjs/node-oauth2-server/blob/v3.0.1/lib/grant-types/refresh-token-grant-type.js (used client.id instead of client.clientId)
		clientId: 'application',
		clientSecret: 'secret',
		grants: [
			'password',
			'refresh_token'
		],
		redirectUris: []
	}],
	confidentialClients: [{
		clientId: 'confidentialApplication',
		clientSecret: 'topSecret',
		grants: [
			'password',
			'client_credentials'
		],
		redirectUris: []
	}],
	tokens: [],
	users: [{
		username: 'pedroetb',
		password: 'password'
	}]
};

// 连接数据库，获取用户数据
const sequelize = require('./DB');

/**
 * Dump the memory storage content (for debug).
 */

let dump = function() {

	console.log('clients', config.clients);
	console.log('confidentialClients', config.confidentialClients);
	console.log('tokens', config.tokens);
	console.log('users', config.users);
};

/*
 * Methods used by all grant types.
 */

module.exports.getAccessToken = function(token) {

	let tokens = config.tokens.filter(function(savedToken) {

		return savedToken.accessToken === token;
	});

	return tokens[0];
};

module.exports.getClient = function(clientId, clientSecret) {
	

// 	let clients = config.clients.filter(function(client) {
// 
// 		return client.clientId === clientId && client.clientSecret === clientSecret;
// 	});
// 
// 	let confidentialClients = config.confidentialClients.filter(function(client) {
// 
// 		return client.clientId === clientId && client.clientSecret === clientSecret;
// 	});

	return clients[0];
};

module.exports.saveToken = function(token, client, user) {

	token.client = {
		id: client.clientId
	};

	token.user = {
		id: user.username || user.clientId
	};

	config.tokens.push(token);

	return token;
};

/*
 * Method used only by password grant type.
 */

module.exports.getUser = function(username, password) {
return 	sequelize.models.user.findAll({
	  where: {
	    username: username,
	    password: password
	  },
		raw: true
	}).then((data) => {
		// console.log(data[0]);
		return data[0] || false;
	}).catch((err) => {
		console.log(err)
	})
};

/*
 * Method used only by client_credentials grant type.
 */

module.exports.getUserFromClient = function(client) {

	let clients = config.confidentialClients.filter(function(savedClient) {

		return savedClient.clientId === client.clientId && savedClient.clientSecret === client.clientSecret;
	});

	return clients[0];
};

/*
 * Methods used only by refresh_token grant type.
 */

module.exports.getRefreshToken = function(refreshToken) {

	let tokens = config.tokens.filter(function(savedToken) {

		return savedToken.refreshToken === refreshToken;
	});

	if (!tokens.length) {
		return;
	}

	let token = Object.assign({}, tokens[0]);
	token.user.username = token.user.id;

	return token;
};

module.exports.revokeToken = function(token) {

	config.tokens = config.tokens.filter(function(savedToken) {

		return savedToken.refreshToken !== token.refreshToken;
	});

	let revokedTokensFound = config.tokens.filter(function(savedToken) {

		return savedToken.refreshToken === token.refreshToken;
	});

	return !revokedTokensFound.length;
};

/**
 * Export model definition object.
 */
// 
// module.exports = {
// 	getAccessToken: getAccessToken,
// 	getClient: getClient,
// 	saveToken: saveToken,
// 	getUser: getUser,
// 	getUserFromClient: getUserFromClient,
// 	getRefreshToken: getRefreshToken,
// 	revokeToken: revokeToken
// };
