const Jwt = require('@hapi/jwt');
const InvariantError = require('../exceptions/InvariantError'); // 1. Perbaiki typo (tambah 'n')

const TokenManager = {
  generateAccessToken: (payload) => Jwt.token.generate(payload, process.env.ACCESS_TOKEN_KEY),
  generateRefreshToken: (payload) => Jwt.token.generate(payload, process.env.REFRESH_TOKEN_KEY),
  verifyRefreshToken: (refreshToken) => {
    try {
      const artifacts = Jwt.token.decode(refreshToken);
      Jwt.token.verifySignature(artifacts, process.env.REFRESH_TOKEN_KEY);
      
      // 2. Tambahkan logika pengembalian payload ini
      const { payload } = artifacts.decoded;
      return payload;

    } catch (error) {
      throw new InvariantError('Refresh token tidak valid'); // Sesuaikan nama variabel error
    }
  },
};

module.exports = TokenManager;