/**
 * @swagger
 * tags:
 *  - name: Consultants
 *    description: Consultant management and consultant skill mappings
 * 
 * 
 * 
 * /consultants:
 *  get:
 *      summary: Get all consultants in system
 *      parameters:
 *          - in: query
 *            name: first_name
 *            schema:
 *              type: string
 *            description: First name of consultant
 *            required: false
 *          - in: query
 *            name: last_name
 *            schema:
 *              type: string
 *            description: Last name of consultant
 *            required: false
 *      tags: [Consultants]
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  consultant_id:
 *                                      type: integer
 *                                  first_name:
 *                                      type: string
 *                                  last_name:
 *                                      type: string
 *              description: Successful return of list of consultants
 *          500:
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: Error processing request
 *              description: Error on server-side processing request
 *  post:
 *      summary: Create a new consultant
 *      parameters:
 *          - in: body
 *            name: body
 *            required: true
 *            schema:
 *              type: object
 *              required:
 *                  - first_name
 *                  - last_name
 *              properties:
 *                  first_name:
 *                      type: string
 *                  last_name:
 *                      type: string
 *      tags: [Consultants]
 *      produces:
 *          - application/json
 *      responses:
 *          201:
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              consultant_id:
 *                                  type: integer
 *                              first_name:
 *                                  type: string
 *                              last_name:
 *                                  type: string
 *              description: The created consultant information
 *          400:
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *              description: Bad request by client
 *          500:
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *              description: Server unable to handle request
 * 
 * 
 * 
 * 
 * /consultants/{consultant_id}:
 *  parameters:
 *      - in: path
 *        name: consultant_id
 *        schema:
 *          type: integer
 *        description: The unique id of the consultant
 *        required: true
 * 
 *  get:
 *      summary: Get a specific consultant based on id
 *      tags: [Consultants]
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              consultant_id:
 *                                  type: integer
 *                              first_name:
 *                                  type: string
 *                              last_name:
 *                                  type: string
 *                              skills:
 *                                  type: object
 *                                  properties:
 *                                      skill_id:
 *                                          type: integer
 *                                      name:
 *                                          type: string
 *                                      description:
 *                                          type: string
 *                                      star_rating:
 *                                          type: number
 *          400:
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *              description: Bad request by client
 *          404:
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *              description: Consultant Id does not exist in database
 *          500:
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *              description: Server unable to process request
 * 
 *  patch:
 *      summary: Update the consultant based on id and payload
 *      parameters:
 *          - in: body
 *            name: body
 *            schema:
 *              type: object
 *              properties:
 *                  first_name:
 *                      type: string
 *                      required: false
 *                  last_name:
 *                      type: string
 *                      required: false
 *            description: The fields to update for consultant
 *            required: true
 *      tags: [Consultants]
 *      produces:
 *          - application/json
 *      responses:
 *          204:
 *              description: Update request was completed successfully
 *          400:
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *              description: The request was poorly formed by client
 *          500:
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *              description: The request was unable to be handled by server
 * 
 *  delete:
 *      summary: Delete a specific consultant based on id
 *      tags: [Consultants]
 *      produces:
 *          - application/json
 *      responses:
 *          204:
 *              description: Delete request was completed successfully
 *          400:
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *              description: The request was poorly formed by client
 *          500:
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *              description: The request was unable to be handled by server
 */