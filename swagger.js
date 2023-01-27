const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Plant API',
    description: 'Some African Plants',
  },
  host: 'plant-image.onrender.com',
  schemes: ['https'],
};

const outputFile = './swaggerdoc.json';
const endpointsFiles = ['./routes/index.js'];

// generate swaggerdoc.json
// swaggerAutogen(outputFile, endpointsFiles, doc);

swaggerAutogen(outputFile, endpointsFiles, doc).then(async () => {
  await import('./server.js');
});