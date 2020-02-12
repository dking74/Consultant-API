const database = require("../database/database");
const { PostgresError } = require("../error");

/**
 * Enum to signify what kind of operations can
 * be done on the database.
 */
const _DatabaseOperations = {
    SELECT: 0,
    INSERT: 1,
    UPDATE: 2,
    DELETE: 3
};

/**
 * Function to convert a list of dictionaries
 * to a proper joined string
 * 
 * @param entries Array
 * @param joined_param string
 * 
 * @returns The joined string of params
 */
const _build_column_string = (entries, joined_param=",") => {
    return (
        entries
            .map(val_array => {
                if (typeof val_array[1] === "string") {
                    return (val_array[0] + '=\'' + val_array[1] + "'");
                }
                else {
                    return (val_array[0] + '=' + val_array[1]);
                }
            })
            .join(joined_param)
    );
}

/**
 * Function to build a search string to identify a 
 * unique entry in the database.
 * 
 * @param search_params object
 * 
 * @returns The unique string found 
 */
const _build_search_string = (search_params) => {
    let search_string = "";

    // Build the query-parameters part of query with params provided
    const object_entries = Object.entries(search_params);
    if (object_entries.length) {
        search_string = " WHERE ";
        search_string += _build_column_string(object_entries, " AND ");
    }

    return search_string;
};

/**
 * This function is a master function to assist in building
 * a qualified query to submit to database. All the functions
 * that directly interface with the database use this function
 * in building the appropriate query.
 * 
 * @param table_name The name of the table and only required param.
 * @param type The type of query to submit to database. One of above ops.
 * @param columns The columns to return in select clause. It is only applicable there.
 * @param search_params The mapped values to input as query params or select params.
 */
const _QueryBuilder = (
            table_name, 
            type=_DatabaseOperations.SELECT,
            columns="*",
            search_params={}) => {

    // If the columns are provided in array form,
    // convert to a joined string for easy manipulation.
    if (typeof columns === Array.isArray(columns)) {
        columns = columns.join(",");
    }

    // If the columns are an object, we have update,
    // so build the column string for update values.
    if (typeof columns === "object") {
        columns = _build_column_string(Object.entries(columns), ",");
    }

    // Operate on the inputted Database Operation.
    // This is where the actual manipulation is done.
    switch (type) {
        case _DatabaseOperations.SELECT:
            return (
                "SELECT " + columns + " FROM " + table_name + _build_search_string(search_params));
        case _DatabaseOperations.INSERT:
            const columnNames = Object.keys(search_params).join(",");
            let valueNames  = Object.values(search_params);
            
            valueNames = valueNames.map(value => 
                (typeof value === "string") ? ("'" + value + "'") : value).join(",");
            const insert_string = " (" + columnNames + ") " + "VALUES (" + valueNames + ")";
            
            return (
                "INSERT INTO " + table_name + insert_string + " RETURNING *");
        case _DatabaseOperations.UPDATE:
            return (
                "UPDATE " + table_name + " SET " + columns + _build_search_string(search_params));
        case _DatabaseOperations.DELETE:
            return (
                "DELETE FROM " + table_name + _build_search_string(search_params));
        default:
            throw new Error("Invalid database operation.");
    }
};

/**
 * Internal function to actually execute query in database
 * 
 * @param query string
 * @param params object
 * 
 * @throws PostgresError
 * 
 * @returns The rows returned from query
 */
const _AsyncOperation = async (query) => {
    // Try to execute query and wait for the result.
    // If an error arises, return that. Otherwise, return the 
    // results row set.
    try {
        const res = await database.query(query);
        return res.rows;
    }
    catch (err) {
        return Promise.reject(
            new PostgresError(
                500, "There was an error processing your request: " + err.detail)
        );
    }
};

module.exports = {
    _QueryBuilder: _QueryBuilder,
    _AsyncOperation: _AsyncOperation,
    _DatabaseOperations: _DatabaseOperations
};