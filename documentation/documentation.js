const express = require("express"),
      router  = express.Router();

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const swagger_config = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "Management API for consultants to skills they possess",
            version: "1.0.0",
            description:
                "This guide details the REST API endpoints for actions and methods " +
                "that a user may perform on consultants and their associated skills.",
            contact: {
                name: "Devon King",
                email: "Devon.King@daugherty.com"
            }
        },
        servers: [
            {
                url: "http://localhost:3000/api/" + current_version
            }
        ]
    },
    apis: ["./documentation/*.js"]
};

/**
 * The router should use SwaggerUI as middleware.
 * The only method that should be handled is a get request,
 * in which a user wishes to see documentation in browser.
 */
router
    .use("/", swaggerUI.serve)
    .get("/",
        swaggerUI.setup(
            swaggerJsdoc(swagger_config), 
            {
                explorer: true
            }
        )
    );

module.exports = router;