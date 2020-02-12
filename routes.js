/********************************************************************
 * @module routes.js
 * 
 * @summary This file is the base router for all routes in the current
 *          REST API version. Consultant and skills route paths are
 *          defined here. This file should only need to be changed
 *          if the whole API content changes (so never).
 ********************************************************************/

/**
 * Base imports for defining the router properties
 */
const path = require('path');
const express = require("express"),
      router = express.Router();

/**
 * Here is where we define the specific routers to bring into scope.
 * 
 * All routers should be defined in the API version sub-directory;
 * There are no exceptions to this ruling.
 * 
 * The 'current_version' is brought into scope through 'index.js' file.
 * If the version needs to be updated, do so at the top of that file.
 */
const consultants = require("./" + current_version + "/consultants");
const skills = require("./" + current_version + "/skills");

/**
 * Route handler for the base of the api
 * 
 * All requests here should print that this url is forbidden.
 */
router.route("/")
    .all((req, res) => {
        res.status(403).sendFile(path.join(__dirname + '/client-html/403.html'));
    });

/**
 * Route handler for consultants add, get, and remove.
 */
router.use('/consultants', consultants);

/**
 * Route handler for skills add, get, and remove.
 */
router.use('/skills', skills);

/**
 * Route to handle any other request coming through.
 * 
 * We should send '404' error here because we don't know how to handle.
 */
router.route('*')
    .all((req, res, next) => {
        res.status(404).sendFile(path.join(__dirname + '/client-html/404.html'));
    });

module.exports = router;