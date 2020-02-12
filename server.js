/********************************************************************
 * @module server.js
 * 
 * @summary This is the main configuration file and application 
 *          structure file for the application. It defines the properties
 *          of the application and showcases the routes available for
 *          REST control.
 ********************************************************************/

/**
 * Set Current Version of the API.
 * Only modify when a 'consultants.js' and 'skills.js'
 * file has been included in v{num} directory.
 * 
 * WHATEVER VERSION OF API BEING USED MUST DEFINE A ROUTES.JS
 * FILE SO THAT THE INDEXED FILE CAN BRING THAT INTO SCOPE.
*/
const current_version = "v1";
global.current_version = current_version;

/**
 * These are global imports from standard library
 * This should NEVER be modified.
 */
const express = require("express");
const path    = require('path');

/**
 * Logger module for importing the global logger
 * responsible for tracking requests in log files.
 */
const logger  = require('./logger/logger');

/**
 * Routes file should only be changed when new version is implemented.
 * It should never need to be changed if the API remains constant in it's routes.
 * 
 * This line should NEVER change, however.
 */
const routes = require('./routes.js');

/**
 * This is the location of the router for documentation
 * of the project. Go here when the documentation page needs to be
 * updated.
 */
const documentation = require('./documentation/documentation');

/**
 * Set up application configuration
 * to be initialized through express.
 */
const app = express();

/**
 * We want to use JSON payloads for this api.
 * 
 * If the data wishes to be changed, this would be
 * acceptable to make modification on this line.
 */
app.use(express.json());

/**
 * Global logger for all requests.
 * The logger should log on a rotating file log,
 * and should be updated every 1 month.
 * 
 * If log settings need to be changed, go to logger/logger.js
 */

app.use(logger);

/**
 * This is the main entry point to access the api
 * 
 * The user must have the correct version defined,
 * and the routes.js file must be created inside the 
 * correct version directory in order to direct the traffic
 * properly.
 */
app.use('/api/' + current_version, routes);

/**
 * This is the entry point for the api documentation.
 * 
 * Send this documentation to user when requested.
 */
app.use('/api/docs', documentation);

/**
 * All other requests that does not go through 
 * /api/v* or /api/docs/swagger.json is incorrect.
 * 
 * Send a PAGE NOT FOUND html page.
 */
app.all("*", (req, res) => {
    res.sendFile(path.join(__dirname + '/client-html/404.html'));
});

module.exports = app;