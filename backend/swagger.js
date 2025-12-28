const swaggerAutogen = require('swagger-autogen')();
const outputFile = './swagger_output.json';
const endpointsFiles = ['server.js']; 

const doc = {
    info: {
        title: 'My API Documentation',
        description: 'Auto-generated documentation for an Express API'
    },
    host: 'localhost:5000', // Update with your host
    schemes: ['http'],
};

swaggerAutogen(outputFile, endpointsFiles, doc);
