const {
    BuiltQuery,
    CustomQuery,
    Create,
    Update,
    Delete,
    CheckRecordExists
} = require("../queries/queries");

const {
    PostgresError
} = require("../error");

const { CheckConsultantExists } = require("./consultant_controller");
const { CheckSkillExists } = require("./skills_controller");

/**
 * _starRatingReturn is simply an enum containing error messages
 * for error-checking the star_rating value provided to a couple 
 * different methods in the file.
 * 
 * This will allow for better error checking.
 */
const _starRatingReturn = {
    OK: "GOOD",
    UNDEFINED: "The 'star_rating' must be supplied as part of payload.",
    INVALID: "The 'star rating' must be a number between 0 and 5."
};

/**
 * Internal function to do a check of the star_rating
 * entered by user (or not entered) as part of payload.
 * 
 * @param star_rating float
 * 
 * @returns _starRatingReturn
 */
const _CheckStarRating = (star_rating) => {
    if (Number.isNaN(Number.parseFloat(star_rating))) {
        return _starRatingReturn.UNDEFINED;
    }

    if (star_rating < 0 || star_rating > 5) {
        return _starRatingReturn.INVALID;
    }

    return _starRatingReturn.OK;
}

/**
 * Create a linking element between a consultant and skill
 * so that consultants can be acknowledged for skills possessed.
 * 
 * @param consultant_id integer
 * @param skill_id integer
 * @param star_rating float 
 */
const CreateConsultantSkill = (consultant_id, skill_id, star_rating) => {
    if ((rating = _CheckStarRating(star_rating)) !== _starRatingReturn.OK) {
        return Promise.reject(
            new PostgresError(400, rating)); 
    }
    else {
        return Create(
            'Consultant_skills',
            {
                consultant_id: consultant_id,
                skill_id: skill_id,
                star_rating: star_rating
            }
        );
    }
};

/**
 * Update a linking consultant skill with it's star rating.
 * 
 * @param consultant_id integer
 * @param skill_id integer
 * @param star_rating float 
 */
const UpdateConsultantSkill = (consultant_id, skill_id, star_rating) => {
    if ((rating = _CheckStarRating(star_rating)) !== _starRatingReturn.OK) {
        return Promise.reject(
            new PostgresError(400, rating)); 
    }
    else {
        return Update(
            'Consultant_skills',
            { star_rating: star_rating },
            { consultant_id: consultant_id, skill_id: skill_id }
        );
    }
};

/**
 * Delete a specific consultant skill mapping based on the 
 * user-entered consultant id and skill id
 * 
 * @param consultant_id integer
 * @param skill_id integer
 */
const DeleteConsultantSkill = (consultant_id, skill_id) => {
    return Delete(
        'Consultant_skills',
        { consultant_id: consultant_id, skill_id: skill_id }
    );
}

/**
 * Check to make sure that a consultant-skill mapping exists in database
 * by seeing if each id exists in their own database.
 *
 * This function is just used as an initial test and then pass
 * control to another controller if this test passes.
 */
const CheckConsultantSkillExists = async (req, res, next) => {
    // This must be done in order to use the other checks.
    // This is because params are no longer defined after other
    // router seizes control.
    req.params.consultant_id = req.consultant_id;
    req.params.skill_id = req.skill_id;
    delete req.consultant_id;
    delete req.skill_id;
    
    // Check if the consultant exists..If it does, check if skill does.
    // If we are successful, pass control to next handler.
    await CheckConsultantExists(req, res, next);
    if (req.consultant_id !== undefined) {
        await CheckSkillExists(req, res, next);
    }
}

module.exports = {
    CreateConsultantSkill: CreateConsultantSkill,
    UpdateConsultantSkill: UpdateConsultantSkill,
    DeleteConsultantSkill: DeleteConsultantSkill,
    CheckConsultantSkillExists: CheckConsultantSkillExists
};