const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const AuthenticationError = require('../../exceptions/AuthenticationError');

class UsersService {
  constructor() {
    this._pool = new Pool();
  }

  // --- Pastikan method addUser yang sudah dibuat sebelumnya tetap ada di sini ---
  async addUser({ username, password, fullname }) {
  }
  
  // --- Fungsi baru yang kita tambahkan ---
  async verifyUserCredential(username, password) {
    const query = {
      text: 'SELECT id, password FROM users WHERE username = $1',
      values: [username],
    };

    const result = await this._pool.query(query);

    // Cek apakah username ditemukan
    if (!result.rows.length) {
      throw new AuthenticationError('Kredensial yang Anda berikan salah');
    }

    const { id, password: hashedPassword } = result.rows[0];

    // Komparasi password plain dengan password yang sudah di-hash
    const match = await bcrypt.compare(password, hashedPassword);

    // Cek apakah password sesuai
    if (!match) {
      throw new AuthenticationError('Kredensial yang Anda berikan salah');
    }

    // Jika lolos semua pengecekan, kembalikan id user
    return id;
  }
}

module.exports = UsersService;