const routes = (handler) => [
  {
    method: 'POST',
    path: '/upload/images',
    handler: handler.postUploadImageHandler,
    options: {
      payload: {
        allow: 'multipart/form-data', // Mengizinkan data form-data
        multipart: true,              // Mengaktifkan parsing multipart
        output: 'stream',             // Mengubah output menjadi stream untuk efisiensi
      },
    },
  },
];

module.exports = routes;