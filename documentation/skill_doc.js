/**
 * @swagger
 * tags:
 *  - name: Skills
 *    description: Skill management and retrieval
 * 
 * 
 * /skills:
 *  get:
 *      summary: Get all skills in system
 *      parameters:
 *          - in: query
 *            name: name
 *            schema:
 *              type: string
 *            description: Name of the skill
 *            required: false
 *      tags: [Skills]
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
 *                                  skill_id:
 *                                      type: integer
 *                                  name:
 *                                      type: string
 *                                  description:
 *                                      type: string
 *              description: The list of skills was successfully returned
 *          500:
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *              description: A server error occurred on request
 *  post:
 *      summary: Create a skill in the database
 *      parameters:
 *          - in: body
 *            name: body
 *            schema:
 *              type: object
 *              properties:
 *                  name:
 *                      type: string
 *                      required: true
 *                  description:
 *                      type: string
 *                      required: true
 *            description: The data to send with request
 *            required: true
 *      tags: [Skills]
 *      produces:
 *          - application/json
 *      responses:
 *          201:
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              skill_id:
 *                                  type: integer
 *                              name:
 *                                  type: string
 *                              description:
 *                                  type: string
 *              description: The skill was created in database
 *          400:
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *              description: The request was poorly constructed by client
 *          500:
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *              description: A server error occurred on request
 *
 * 
 * /skills/{skill_id}:
 *  parameters:
 *      - in: path
 *        name: skill_id
 *        schema:
 *          type: integer
 *        description: The specific skill identification
 *        required: true
 * 
 *  get:
 *      summary: Get the specific skill based on id
 *      tags: [Skills]
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              skill_id:
 *                                  type: integer
 *                              name:
 *                                  type: string
 *                              description:
 *                                  type: string
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
 *              description: Skill Id does not exist in database
 *          500:
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *              description: Server unable to process request
 *  patch:
 *      summary: Update the skill based on id and payload
 *      parameters:
 *          - in: body
 *            name: body
 *            schema:
 *              type: object
 *              properties:
 *                  name:
 *                      type: string
 *                      required: false
 *                  description:
 *                      type: string
 *                      required: false
 *            description: The fields to update for skill
 *            required: true
 *      tags: [Skills]
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
 *  delete:
 *      summary: Delete a specific skill based on id
 *      tags: [Skills]
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