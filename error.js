class PostgresError extends Error {
    constructor(code, detail) {
        super();

        this.code = code;
        this.detail = detail;
    }

    get message() {
        return {
            "message": this.detail
        };
    }
};

/**
 * Function to check that an id provided
 * is a valid integer.
 * 
 * @param id string
 * 
 * @throws PostgresError
 * 
 * @returns A string converted to int
 */
const CheckValidId = (id) => {
    // Make sure the id is an integer,
    // Return 400 error if not.
    if (Number.isNaN(Number.parseInt(id))) {
        return false;
    }

    return true;
};

module.exports = {
    PostgresError: PostgresError,
    CheckValidId: CheckValidId
};