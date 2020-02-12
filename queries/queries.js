const {
    _QueryBuilder,
    _AsyncOperation,
    _DatabaseOperations
} = require("./query_convenience");

/**
 * Function to create an entity within
 * the database
 * 
 * @param table_name string
 * @param json object
 */
const Create = (table_name, json) => {
    const query_string = _QueryBuilder(
        table_name, _DatabaseOperations.INSERT, "*", json);
    return _AsyncOperation(query_string);
};

/**
 * Function to update a resource within database
 * 
 * @param table_name string
 * @param table_columns string or Array
 * @param params object
 */
const Update = (table_name, table_columns="*", params={}) => {
    const query_string = _QueryBuilder(
        table_name, _DatabaseOperations.UPDATE, table_columns, params);
    return _AsyncOperation(query_string);
};

/**
 * Function to delete a specific entity
 * based on the params given
 * 
 * @param table_name string
 * @param params object
 */
const Delete = (table_name, params={}) => {
    const query_string = _QueryBuilder(
        table_name, _DatabaseOperations.DELETE, "*", params);
    return _AsyncOperation(query_string);
}

/**
 * Function to query and get data from database
 * with a built query string through params.
 * 
 * @param table_name string
 * @param table_columns string or Array
 * @param params object
 * 
 * @returns The rows returned from database
 */
const BuiltQuery = (table_name, table_columns="*", params={}) => {
    const query_string = _QueryBuilder(
        table_name, _DatabaseOperations.SELECT, table_columns, params);
    return _AsyncOperation(query_string);
}

/**
 * Function to query the database with a user
 * entered defined query
 * 
 * @param query_string string
 * 
 * @returns The query results
 */
const CustomQuery = (query_string) => {
    return _AsyncOperation(query_string);
}

/**
 * Function to check if a specific id exists in database.
 * 
 * @param table_name The table to get info from
 * @param pk_column The primary key column name
 * 
 * @returns The rows found for the custom query
 */
const CheckExists = (table_name, params) => {
    const query_string = _QueryBuilder(
        table_name, _DatabaseOperations.SELECT, 1, params);

    return _AsyncOperation(query_string);
}

module.exports = {
    BuiltQuery: BuiltQuery,
    CustomQuery: CustomQuery,
    Create: Create,
    Update: Update,
    Delete: Delete,
    CheckRecordExists: CheckExists
};