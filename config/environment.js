var _ = require('lodash');
require('dotenv').load()

var localEnvVars = {
  TITLE:      'jwt_auth',
  SAFE_TITLE: 'jwt_auth'
};

// Merge all environmental variables into one object.
module.exports = _.extend(process.env, localEnvVars);
