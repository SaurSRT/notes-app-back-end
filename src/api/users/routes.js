const routes = (handler) => [
  {
    method: 'POST',
    path: '/users',
    handler: handler.postUserHandler,
  },
  // Route untuk melihat detail user (opsional jika sudah ada di materi)
  {
    method: 'GET',
    path: '/users/{id}',
    handler: handler.getUserByIdHandler,
  },
];

module.exports = routes;