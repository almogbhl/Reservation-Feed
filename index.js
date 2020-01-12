// eslint-disable-next-line no-global-assign
require = require('esm')(module);
require('dotenv').config();
require('module-alias/register');
require('./server.js');
