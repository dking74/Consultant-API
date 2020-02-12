const express = require("express"),
      router  = express.Router();

/**
 * Queries files are found in route_queries directory.
 * If additional functionality is needed, go there.
 */
const queries = require("../controllers/consultant_controller");

/**
 * Route handler for /api/{current_version}/consultants
 */
router.route("/")
    /**
     * Get the consultants in system
     */
    .get(queries.GetConsultants)

    /**
     * The post method creates a consultant entry in the database.
     * A body containing 'first_name' and 'last_name' must be presented.
     */
    .post(queries.CreateConsultant);

/**
 * Route path for /consultants/consultant_id path.
 * This brings the consultant + skills into scope.
 */
router.route('/:consultant_id')

    /**
     * All consultant id functions should be checked first if
     * the id is an integer. Once we know it is an integer,
     * we can then see if the id exists in the database.
     * 
     * Any additional processing in other methods can be done
     * after these checks take place.
     */
    .all(queries.CheckConsultantExists)

    /**
     * Get a specific consultant + skill information
     * for a user entered consultant id.
     */
    .get(queries.GetConsultant)

    /**
     * Update a specific consultant with a JSON
     * body containing a first_name or last_name
     * that the user wishes to change.
     */
    .patch(queries.UpdateConsultant)

    /**
     * Delete a specific consultant based on
     * the user-entered consultant id.
     */
    .delete(queries.DeleteConsultant);

/**
 * Any consultant_id/skill_id pattern should be
 * handled by consultant_skills router, which is responsible
 * for mapping consultants to specific skills.
 */
const consultant_skills = require("./consultant_skills");
router.use('/:consultant_id/:skill_id',
    (req, res, next) => {
        req.consultant_id = req.params.consultant_id;
        req.skill_id = req.params.skill_id;

        next();
    },
    consultant_skills);

module.exports = router;