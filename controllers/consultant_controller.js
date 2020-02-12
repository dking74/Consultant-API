const {
    BuiltQuery,
    CustomQuery,
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
 * Get a specific consultant based on id entered in path
 * 
 * @param consultant_id integer
 * 
 * @returns The consultant based on id
 */
const GetConsultant = async (req, res) => {
    const consultant_id = req.consultant_id;

    return CustomQuery(
                "SELECT " +
                "   c.*, " +
                "   ( " +
                "       SELECT json_agg(row) " +
                "       FROM (" +
                "           SELECT s.skill_id as skill_id, " +
                "                  s.name as name, " +
                "                  s.description as description, " +
                "                  t.star_rating as rating " +
                "           FROM Skills s " +
                "           INNER JOIN Consultant_skills t " +
                "           ON s.skill_id = t.skill_id " +
                "           WHERE t.consultant_id = c.consultant_id " +
                "       ) row " +
                "   ) as skills " +
                "FROM Consultants c " +
                "WHERE c.consultant_id=" + consultant_id)
        .then((success) => {
            res.status(200).json(success);
        })
        .catch((failure) => {
            res.status(failure.code).json(failure.message);
        });
};

/**
 * Get the consultants from the database.
 * We can provide first_name and last_name as
 * optional params to query on.
 */
const GetConsultants = (req, res) => {
    const {first_name, last_name} = req.query;

    const params = {};
    if (first_name)
        params.first_name = first_name;
    if (last_name)
        params.last_name  = last_name;

    // Build the query and submit the result
    return BuiltQuery('Consultants', "*", params)
        .then((success) => {
            res.status(200).json(success);
        })
        .catch((err) => {
            res.status(err.code).json(err.message);
        });
};

/**
 * Create a specific consultant with a payload
 * The first_name and last_name combination must
 * be supplied in json form.
 */
const CreateConsultant = (req, res) => {
    const consultant_info = req.body;

    // Make sure first name and last name exist in payload
    if (!consultant_info.first_name || !consultant_info.last_name) {
        res.status(400).json(
            {message: "One or both of ('first_name', 'last_name') is missing from payload."}
        );
    }

    // Make sure that no other keys except consultant_id, first_name, or last_name exist in payload
    if (Object.keys(consultant_info).filter((key) => !["consultant_id", "first_name", "last_name"].includes(key)).length) {
        res.status(400).json(
            {message: "Only 'consultant_id', 'first_name', or 'last_name' keys can exist in payload."}
        );
    }

    return Create('Consultants', consultant_info)
        .then((success) => {
            res.status(201).json(success);
        })
        .catch((err) => {
            res.status(err.code).json(err.message);
        });
};

/**
 * Update a specific consultant based on the consultant id
 * and the qualified info being changed
 */
const UpdateConsultant = (req, res) => {
    const consultant_id = req.consultant_id;
    const consultant_info = req.body;

    /**
     * Consultant info must be set to update the consultant and one of, or both,
     * of the first_name/last_name must be set in payload.
     */
    if (typeof consultant_info === undefined ||
         (!consultant_info.first_name && !consultant_info.last_name)) {
        res.status(400).json(
            {message: "One or both of ('first_name', 'last_name') must be included in payload."}
        );
    }

    const params = {};
    if (consultant_info.first_name)
        params.first_name = consultant_info.first_name;
    if (consultant_info.last_name)
        params.last_name  = consultant_info.last_name;

    // Submit the request and send proper response
    return Update('Consultants', params, {consultant_id: consultant_id})
        .then((success) => {
            res.status(204).send("");
        })
        .catch((err) => {
            res.status(err.code).json(err.message);
        });
};

/**
 * Delete a specific consultant based on id provided
 * 
 * @param consultant_id integer
 */
const DeleteConsultant = (req, res) => {
    const consultant_id = req.consultant_id;

    return Delete('Consultants', {consultant_id: consultant_id})
        .then((success) => {
            res.status(204).send("");
        })
        .catch((err) => {
            res.status(err.code).json(err.message);
        });
};

/**
 * Check if a specific consultant exists in the database.
 * If the id does exist, pass control to next route handler,
 * and then next controller.
 */
const CheckConsultantExists = async (req, res, next) => {
    const consultant_id = req.params.consultant_id;

    // Check if the is valid, and then see if it is in database
    const valid_id = CheckValidId(consultant_id);
    if (valid_id) {
        await CheckRecordExists('Consultants', {consultant_id: Number.parseInt(consultant_id)})
            .then((exists) => {
                if (exists.length > 0) {
                    req.consultant_id = Number.parseInt(consultant_id);
                    next();
                }
                else {
                    res.status(400).json(
                        {message: "The consultant id was not found in database."}
                    );
                }
            })
            .catch((failure) => {
                res.status(failure.code).json(failure.message);
            });
    }
    else {
        res.status(400).json(
            {message: "The consultant id in path must be a valid integer."}
        );
    }
};

module.exports = {
    GetConsultant: GetConsultant,
    GetConsultants: GetConsultants,
    CreateConsultant: CreateConsultant,
    UpdateConsultant: UpdateConsultant,
    DeleteConsultant: DeleteConsultant,
    CheckConsultantExists: CheckConsultantExists
};