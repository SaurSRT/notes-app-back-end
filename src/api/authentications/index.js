const AuthenticationsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'authentications',
  version: '1.0.0',
  register: async (server, {
    authenticationsService,
    usersService,
    tokenManager,
    validator,
  }) => {
    // Membuat instance handler dengan menyuntikkan (inject) service dan tools yang dibutuhkan
    const authenticationsHandler = new AuthenticationsHandler(
      authenticationsService,
      usersService,
      tokenManager,
      validator,
    );

    // Mendaftarkan routes yang sudah terhubung dengan handler
    server.route(routes(authenticationsHandler));
  },
};