const express = require("express"),
      router  = express.Router();

/**
 * Queries files are found in route_queries directory.
 * If additional functionality is needed, go there.
 */
const queries = require("../controllers/consultant_skills_controller");
const { GetConsultant } = require("../controllers/consultant_controller");

/**
 * This route allows users to manipulate a specific
 * consultant skill by allowing direct access with 
 * the skill id in the URL.
 */
router.route("/")
    /**
     * Before we can do any operation, we need to check that entry
     * first exists. Then pass control to other methods.
     */
    .all(queries.CheckConsultantSkillExists)

    /**
     * Create a new consultant skill, which
     * maps a consultant to a specific skill he/she has.
     */
    .post(async (req, res) => {
        await queries.CreateConsultantSkill(
                req.consultant_id, req.skill_id, req.body.star_rating)
            .then(async (success) => {
                await GetConsultant(req.consultant_id)
                    .then((consultant_found) => {
                        res.status(201).json(consultant_found);
                    })
                    .catch((cons_failed) => {
                        res.status(cons_failed.code).json(cons_failed.message);
                    });
            })
            .catch((failure) => {
                res.status(failure.code).json(failure.message);
            });
    })

    /**
     * Update a specific consultant skill mapping
     * to allow a user to change a consultants' skill.
     */
    .patch(async (req, res) => {
        await queries.UpdateConsultantSkill(
                req.consultant_id, req.skill_id, req.body.star_rating)
            .then(async (success) => {
                res.status(204).send("");
            })
            .catch((failure) => {
                res.status(failure.code).json(failure.message);
            });
    })

    /**
     * Delete a specific consultant skill when the skill
     * does not pertain to user anymore.
     */
    .delete(async (req, res) => {
        await queries.DeleteConsultantSkill(
                req.consultant_id, req.skill_id)
            .then((success) => {
                res.status(204).send("");
            })
            .catch((failure) => {
                res.status(failure.code).json(failure.message);
            });
    });

module.exports = router;