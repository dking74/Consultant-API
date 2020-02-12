/********************************************************************
 * @author Devon King
 * @version 1.0
 * 
 * @summary This is the main entry point of the RESTFUL controller.
 *          In order to start server, one must invoke this file.
 *          This can be done by: `node index.js`.
 ********************************************************************/

// Application should be imported from server file
const app = require('./server');

// Have the application start running on designated port
app.listen(3000);