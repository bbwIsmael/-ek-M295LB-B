const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Tasks API',
  },
  host: 'localhost:3000'
};

const outputFile = './swagger-output.json';
const routes = ['./tasks.js'];

swaggerAutogen(outputFile, routes, doc).then();
