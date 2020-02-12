const { initializeDatabase, clearDatabase } = require('./database_ops');

// Clear out database and initialize it back up
(async () => {
    await clearDatabase();
    await initializeDatabase();
})();