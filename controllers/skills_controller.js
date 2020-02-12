const {
    BuiltQuery,
    Create,
    Update,
    Delete,
    CheckRecordExists
} = require("../queries/queries");

const {
    PostgresError,
    CheckValidId
} = require("../error");

/**
 * Get all the skills in database, or filter by name
 * 
 * Could be /api/{v1}/skills?name=Python
 */
const GetSkills = (req, res) => {
    const {name} = req.query;

    const params = {};
    if (name)
        params.name = name;

    // Submit the query and send a response
    return BuiltQuery('Skills', "*", params)
        .then((success) => {
            res.status(200).json(success);
        })
        .catch((err) => {
            res.status(err.code).json(err.message);
        });
};

/**
 * Get a specific skill based on the id entered
 */
const GetSkill = (req, res) => {
    const skill_id = req.skill_id;

    // Build a query and execute. Then, send response back to user.
    return BuiltQuery('Skills', "*", {skill_id: skill_id})
        .then((success) => {
            res.status(200).json(success);
        })
        .catch((err) => {
            res.status(err.code).json(err.message);
        });
};

/**
 * Create a specific skill in the database
 * 
 * The body should look like:
 *   {name: "skill_name"}
 */
const CreateSkill = (req, res) => {
    const skill_info = req.body;

    // Make sure that name at the very least exists in payload
    if (!skill_info.name) {
        res.status(400).json(
            {message: "Name parameter must exist in payload."}
        );
    }

    // Make sure that only skill_id, name, and/or description in payload
    if (Object.keys(skill_info).filter((key) => !["skill_id", "name", "description"].includes(key)).length) {
        res.status(400).json(
            {message: "Only 'skill_id', 'name', or 'description' keys can exist in payload."}
        );
    }

    // Submit the create request and send the corresponding response
    return Create('Skills', skill_info)
        .then((success) => {
            res.status(201).json(success);
        })
        .catch((err) => {
            res.status(err.code).json(err.message);
        });
};

/**
 * Update a specific skill on the name and description
 */
const UpdateSkill = (req, res) => {
    const skill_id = req.skill_id;
    const {name, description} = req.body;

    /**
     * Skill_info must be set to update a skill and one
     * of name or description must be set in payload.
     */
    if (!name && !description) {
        res.status(400).json(
            {message: "One or both of ('name', 'description') must be included in payload."}
        );
    }

    /**
     * Set the params based on what was entered in payload
     */
    const params = {};
    if (name)
        params.name = name;
    if (description)
        params.description = description;

    // Submit an update request and send the response back
    return Update('Skills', params, {skill_id: skill_id})
        .then((success) => {
            res.status(204).send("");
        })
        .catch((err) => {
            res.status(err.code).json(err.message);
        });
};

/**
 * Delete a skill from the database with the given id
 */
const DeleteSkill = (req, res) => {
    const skill_id = req.skill_id;

    // Submit a delete request and send the response back to user
    return Delete('Skills', {skill_id: skill_id})
        .then((success) => {
            res.status(204).send("");
        })
        .catch((err) => {
            res.status(err.code).json(err.message);
        });
};

/**
 * Check if a specific skills exists in the database
 * 
 * Control flow will be passed to new controller if the
 * id does actually exist in the database.
 */
const CheckSkillExists = async (req, res, next) => {
    const skill_id = req.params.skill_id;

    const valid_id = CheckValidId(skill_id);
    if (valid_id) {
        await CheckRecordExists('Skills', {skill_id: Number.parseInt(skill_id)})
            .then((exists) => {
                if (exists.length > 0) {
                    req.skill_id = Number.parseInt(skill_id);
                    next();
                }
                else {
                    res.status(400).json(
                        {message: "The skills id was not found in database."}
                    );
                }
            })
            .catch((failure) => {
                res.status(failure.code).json(failure.message);
            });
    }
    else {
        res.status(400).json(
            {message: "The skills id in path must be a valid integer."}
        );
    }
};

module.exports = {
    GetSkills: GetSkills,
    GetSkill: GetSkill,
    CreateSkill: CreateSkill,
    UpdateSkill: UpdateSkill,
    DeleteSkill: DeleteSkill,
    CheckSkillExists: CheckSkillExists
};