const database = require("./database");

const initializeDatabase = async () => {
    /**
     * Insert some users into 'Consultants' table
     */
    console.log("Setting consultant id back to 1");
    await database.query("SELECT setval('consultants_consultant_id_seq'::regclass, 1, false)");

    console.log("Inserting data into consultants table");
    await database.query(
        "INSERT INTO Consultants " +
        "   (first_name, last_name) " +
        "VALUES " +
        "   ('Devon', 'King'), " +
        "   ('Jordan', 'King'), " +
        "   ('Sam', 'Brewer'), " +
        "   ('Jake', 'Brooks')"
    );

    /**
     * Insert some users into 'Skills' table
     */
    console.log("Setting skill id back to 1");
    await database.query("SELECT setval('skills_skill_id_seq'::regclass, 1, false)");

    console.log("Inserting data into skills table");
    await database.query(
        "INSERT INTO Skills " +
        "   (name, description) " +
        "VALUES " +
        "   ('Python', 'The Python programming language'), " +
        "   ('C++', 'The C++ programming language'), " +
        "   ('Javascript', 'The Javascript programming language'), " +
        "   ('Node.js', 'The Node framework for javascript backends'), " +
        "   ('Java', 'The Java programming language')"
    );

    /**
     * Insert some users into 'Consultant_skills' table
     */
    console.log("Setting consultant id back to 1");
    await database.query("SELECT setval('consultant_skills_consultant_skill_id_seq'::regclass, 1, false)");
    
    console.log("Inserting data into consultant_skills table");
    await database.query(
        "INSERT INTO Consultant_skills " +
        "   (consultant_id, skill_id, star_rating) " +
        "VALUES " +
        "   (1, 1, 5), " +
        "   (1, 2, 4), " +
        "   (2, 4, 3), " +
        "   (3, 5, 4), " +
        "   (4, 3, 2)"
    );

    console.log("End of inserting into database!");
};

const clearDatabase = async () => {
    /**
     * Delete rows in Consultants table
     */
    await database.query(
        "DELETE FROM Consultants"
    );

    /**
     * Delete rows in Skills table
     */
    await database.query(
        "DELETE FROM Skills"
    );

    /**
     * Delete rows in Consultant_skills table
     */
    await database.query(
        "DELETE FROM Consultant_skills"
    );
};

module.exports = {
    initializeDatabase,
    clearDatabase
}