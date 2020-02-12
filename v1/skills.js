const express = require("express"),
      router  = express.Router();

/**
 * Queries files are found in route_queries directory.
 * If additional functionality is needed, go there.
 */
const queries = require("../controllers/skills_controller");

/**
 * Router to identify and handle all routes
 * dealing with 'skills' url
 */
router.route("/")
    /**
     * Get all skills, or filter by name, from database
     */
    .get(queries.GetSkills)

    /**
     * Create a specific skill in the database
     * Payload should be something like:
     *  {name: name, description: description}
     */
    .post(queries.CreateSkill);

router.route("/:skill_id")
    /**
     * All skill id functions should be checked first if
     * the id is an integer. Once we know it is an integer,
     * we can then see if the id exists in the database.
     * 
     * Any additional processing in other methods can be done
     * after these checks take place.
     */
    .all(queries.CheckSkillExists)

    /**
     * Get a specific skill from database
     */
    .get(queries.GetSkill)

    /**
     * Update a specific skill in the database
     * with either name and/or description in payload
     * 
     * Can update with following payload:
     *  {name: name, description: description}
     */
    .patch(queries.UpdateSkill)

    /**
     * Delete a specific skill from database
     */
    .delete(queries.DeleteSkill);

module.exports = router;