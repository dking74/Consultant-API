/**
 * @swagger
 * tags:
 *  - name: Consultant Skills
 *    description: Mapping of consultants to associated skills
 * 
 * 
 * 
 * /consultants/{consultant_id}/{skill_id}:
 *  parameters:
 *      - in: path
 *        name: consultant_id
 *        schema:
 *          type: integer
 *        description: ID of the specific consultant
 *        required: true
 *      - in: path
 *        name: skill_id
 *        schema:
 *          type: integer
 *        description: ID of the specific skill
 *        required: true
 * 
 *  post:
 *      summary: Map a consultant to a specific skill
 *      parameters:
 *          - in: body
 *            name: body
 *            required: true
 *            schema:
 *              type: object
 *              required:
 *                  - star_rating
 *              properties:
 *                  star_rating:
 *                      type: float
 *              example: {
 *                  "star_rating": 3.5
 *              }
 *      tags: [Consultant Skills]
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
 *              description: The consultant with skills mapped to it
 *          400:
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *              description: The parameters provided by client were not acceptable
 *          500:
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *              description: Error occurred on server-side
 *
 *  patch:
 *      summary: Update a record on a mapped skill
 *      parameters:
 *          - in: body
 *            name: body
 *            required: true
 *            schema:
 *              type: object
 *              required:
 *                  - star_rating
 *              properties:
 *                  star_rating:
 *                      type: number
 *              example: {
 *                  "star_rating": 3.5
 *              }
 *      tags: [Consultant Skills]
 *      produces:
 *          - application/json    
 *      responses:
 *          204:
 *              description: The consultant-skill star_rating was updated successfully
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
 *              description: The request was unable to be handled by  
 * 
 *  delete:
 *      summary: Delete a specific consultant-skill mapping
 *      tags: [Consultant Skills]
 *      responses:
 *          204:
 *              description: The consultant-skill mapping was deleted
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
 *              description: The request was unable to be handled by
 */