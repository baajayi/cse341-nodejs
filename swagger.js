const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'My API',
    description: 'Contacta',
  },
  host: 'https://contact-swagger.onrender.com',
  schemes: ['http'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// generate swagger.json
// swaggerAutogen(outputFile, endpointsFiles, doc);

swaggerAutogen(outputFile, endpointsFiles, doc).then(async () => {
  await import('./server.js');
});