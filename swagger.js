const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Plant Api',
    description: 'Plants',
  },
  host: 'localhost:8080',
  schemes: ['http'],
};

const outputFile = './swaggerdoc.json';
const endpointsFiles = ['./routes/index.js'];

// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);

// // swaggerAutogen(outputFile, endpointsFiles, doc).then(async () => {
// //   await import('./server.js');
// });