const request = require('supertest');
const app = require('../server');

const {
    initializeDatabase,
    clearDatabase
} = require('../database/database_ops');

const base_api = '/api/' + current_version;

describe('Consultant API endpoint tests', () => {
    /**
     * Initialize the database with which we will work with
     */
    beforeAll(() => {
        return initializeDatabase();
    });

    /**
     * Clear the database for fresh pallet
     */
    afterAll(() => {
        return clearDatabase();
    });

    describe('Consultant API requests to /consultants', () => {
        describe('Consultant API GET tests to retrieve all consultants', () => {
            /**
             * GET request to /api/{current_version}/consultants with no filter.
             * This should return every consultant in database with status code 200.
             */
            it('GET '+base_api+'/consultants with no filter', async () => {
                // Expected results in response
                const expected_response_body = [
                    { consultant_id: 1, first_name: 'Devon', last_name: 'King' },
                    { consultant_id: 2, first_name: 'Jordan', last_name: 'King' },
                    { consultant_id: 3, first_name: 'Sam', last_name: 'Brewer' },
                    { consultant_id: 4, first_name: 'Jake', last_name: 'Brooks' }
                ];
                const expected_response_code = 200;

                // Perform test
                const response = await request(app).get(base_api + '/consultants');

                // Check the results of the request
                expect(response.status).toBe(expected_response_code);
                expect(response.body).toStrictEqual(expected_response_body);
            });

            /**
             * GET request to /api/{current_version}/consultants WITH filter.
             * This should return every consultant in database with status code 200.
             */
            it('GET '+base_api+'/consultants WITH last_name filter', async () => {
                // Expected results in response
                const expected_response_body = [
                    { consultant_id: 1, first_name: 'Devon', last_name: 'King' },
                    { consultant_id: 2, first_name: 'Jordan', last_name: 'King' },
                ];
                const expected_response_code = 200;

                // Perform test
                const response = await request(app).get(base_api + '/consultants?last_name=King');

                // Check the results of the request
                expect(response.status).toBe(expected_response_code);
                expect(response.body).toStrictEqual(expected_response_body);
            });

            /**
             * GET request to /api/{current_version}/consultants WITH INCORRECT FILTER.
             * This should return every consultant in database with status code 200.
             */
            it('GET '+base_api+'/consultants WITH last_name filter w/o return', async () => {
                // Expected results in response
                const expected_response_body = [];
                const expected_response_code = 200;

                // Perform test
                const response = await request(app).get(base_api + '/consultants?last_name=Kin');

                // Check the results of the request
                expect(response.status).toBe(expected_response_code);
                expect(response.body).toStrictEqual(expected_response_body);
            });
        });

        /**
         * Describe testing consultants with POST requests
         */
        describe('Consultant API POST tests to create consultants', () => {
            /**
             * Create a consultant with no errors
             */
            it('Create consultant with perfect conditions', async () => {
                // Expected results in response
                const expected_response_body = [
                    { consultant_id: 5, first_name: 'Charlie', last_name: 'Brown' }
                ];
                const expected_response_code = 201;
                
                // Perform test
                const response = await request(app)
                                    .post(base_api + '/consultants')
                                    .send(
                                        {'consultant_id': 5, 'first_name': 'Charlie', 'last_name': 'Brown'}
                                    );
                
                // Check the results of the request
                expect(response.status).toBe(expected_response_code);
                expect(response.body).toStrictEqual(expected_response_body);
            });

            /**
             * Attempt to create consultant but fail due to bad id
             */
            it('Fail creating consultant due to consultant id already existing', async () => {
                // Expected results in response
                const expected_response_body = {
                    message: 'There was an error processing your request: Key (consultant_id)=(4) already exists.'
                };
                const expected_response_code = 500;
                
                // Perform test for creation
                const response = await request(app)
                                    .post(base_api + '/consultants')
                                    .send(
                                        {'consultant_id': 4, 'first_name': 'Charlie', 'last_name': 'Brown'}
                                    );
                
                // Check the results of the request
                expect(response.status).toBe(expected_response_code);
                expect(response.body).toStrictEqual(expected_response_body);
            });

            /**
             * Attempt to create consultant but fail due to the payload elements not be submitted
             */
            it('Fail creating consultant due to last_name missing', async () => {
                // Expected results in response
                const expected_response_body = {
                    message: "One or both of ('first_name', 'last_name') is missing from payload."
                };
                const expected_response_code = 400;
                
                // Perform test for creation
                const response = await request(app)
                                    .post(base_api + '/consultants')
                                    .send(
                                        {'consultant_id': 5, 'first_name': 'Charlie'}
                                    );

                // Check the results of the request
                expect(response.status).toBe(expected_response_code);
                expect(response.body).toStrictEqual(expected_response_body);
            });
        });
    });

    /**
     * Describe all requests
     */
    describe('Consultant API requests to /consultants/:consultant_id', () => {
        /**
         * Describe testing consultants + id with GET requests
         */
        describe('Consultant API GET tests to get specific consultants', () => {
            /**
             * GET a specific id entered on path with no failures
             */
            it('GET a specific consultant with no failure', async () => {
                // Expected results in response
                const expected_first_name = 'Devon';
                const expected_last_name = 'King';
                const expected_skills = [
                    {
                      skill_id: 1,
                      name: 'Python',
                      description: 'The Python programming language',
                      rating: 5
                    },
                    {
                      skill_id: 2,
                      name: 'C++',
                      description: 'The C++ programming language',
                      rating: 4
                    }
                ];
                const expected_response_code = 200;
                
                // Perform test for creation
                const response = await request(app).get(base_api + '/consultants/' + 1);
                const consultant_info = response.body[0];
                
                // Pull specific properties from response
                const actual_first_name = consultant_info.first_name;
                const actual_last_name = consultant_info.last_name;
                const actual_skills = consultant_info.skills;

                // Check the results of the request
                expect(response.status).toBe(expected_response_code);
                expect(actual_first_name).toBe(expected_first_name);
                expect(actual_last_name).toBe(expected_last_name);
                expect(actual_skills).toStrictEqual(expected_skills);
            });

            /**
             * GET a specific id entered on path with a failure due to no id
             */
            it('Fail getting consultant due to invalid id', async () => {
                // Expected results in response
                const expected_body = {
                    message: 'The id was not found in database.'
                };
                const expected_status = 400;
                
                // Perform test for creation
                const response = await request(app).get(base_api + '/consultants/' + 70);
                
                // Check the results of the request
                expect(response.status).toBe(expected_status);
                expect(response.body).toStrictEqual(expected_body);
            });

            /**
             * GET a specific id entered on path with a failure due to id not being int
             */
            it('Fail getting consultant due to id not being integer', async () => {
                // Expected results in response
                const expected_body = {
                    message: 'The id in path must be a valid integer.'
                };
                const expected_status = 400;
                
                // Perform test for creation
                const response = await request(app).get(base_api + '/consultants/asdklfjasd');

                // Check the results of the request
                expect(response.status).toBe(expected_status);
                expect(response.body).toStrictEqual(expected_body);
            });
        });

        /**
         * Describe testing consultants + id with PATCH requests
         */
        describe('Consultant API PATCH tests to update specific consultants', () => {
            /**
             * PATCH a specific id entered on path with no failures
             */
            it('PATCH a specific consultant with no failure', async () => {
                // Expected results in response
                const expected_body = {};
                const expected_status = 204;
                
                // Perform test for creation
                const response = await request(app)
                                    .patch(base_api + '/consultants/2')
                                    .send({last_name: 'Coker'});

                // Check the results of the request
                expect(response.status).toBe(expected_status);
                expect(response.body).toStrictEqual(expected_body);
            });

            /**
             * FAIL on PATCH due to invalid payload
             */
            it('Fail with updating id 2 due to invalid request', async () => {
                // Expected results in response
                const expected_body = {
                    message: "One or both of ('first_name', 'last_name') must be included in payload."
                };
                const expected_status = 400;
                
                // Perform test for creation
                const response = await request(app)
                                    .patch(base_api + '/consultants/2')
                                    .send({});

                // Check the results of the request
                expect(response.status).toBe(expected_status);
                expect(response.body).toStrictEqual(expected_body);
            });
        });

        /**
         * Describe testing consultants + id with DELETE requests
         */
        describe('Consultant API DELETE tests to delete specific consultants', () => {
            /**
             * DELETE a specific id entered on path with no failures
             */
            it('DELETE a specific consultant with no failure', async () => {
                // Expected results in response
                const expected_body = {};
                const expected_status = 204;
                
                // Perform test for creation
                const response = await request(app)
                                    .delete(base_api + '/consultants/5');

                // Check the results of the request
                expect(response.status).toBe(expected_status);
                expect(response.body).toStrictEqual(expected_body);
            });

            /**
             * Error on attempting to delete a non-valid id
             */
            it('Fail on deleting a non-existant id', async () => {
                // Expected results in response
                const expected_body = {
                    message: 'The id was not found in database.'
                };
                const expected_status = 400;
                
                // Perform test for creation
                const response = await request(app)
                                    .delete(base_api + '/consultants/20');

                // Check the results of the request
                expect(response.status).toBe(expected_status);
                expect(response.body).toStrictEqual(expected_body);
            });
        });
    });
});

/*
    console.log(response.body);
    console.log(response.status);
*/