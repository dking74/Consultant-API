const fs     = require('fs');
const path   = require('path');
const morgan = require('morgan');
const rfs    = require('rotating-file-stream');
const moment = require('moment-timezone');

// See if the "logs" directory exists, and if not
// create that directory for users
(function(directory) {
    try {
        fs.statSync(directory)
    } catch (e) {
        fs.mkdirSync(directory);
    }
})(path.join(__dirname, "../logs/"));

// Define date token for the custom timezone for server
morgan.token('date', (req, res) => {
    return moment().tz('America/Chicago').format();
});

// Define the custom format for the logger 
morgan.format(
    'request_format',
    '[:date] - :status - ":method :url"'
);

// Create a rotating-log-file instance
const logger = morgan(
    'request_format',
    {
        stream: rfs.createStream(
            'requests.log', {
                interval: '1m',
                maxFiles: 10,
                maxSize: '100M',
                path: path.join(__dirname, "../logs/")
            })
    },
    {
        flags: 'a'
    }
);

module.exports = logger;