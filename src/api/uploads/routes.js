const path = require('path');

const routes = (handler) => [
  {
    method: 'POST',
    path: '/upload/images',
    handler: handler.postUploadImageHandler,
    options: {
      payload: {
        allow: 'multipart/form-data',
        multipart: true,
        output: 'stream',
      },
    },
  },
  {
    method: 'GET',
    path: '/upload/{param*}', // Menangkap nama file
    handler: {
      directory: {
        path: path.resolve(__dirname, 'file'), // Mengarah ke folder 'file'
      },
    },
  },
];

module.exports = routes;