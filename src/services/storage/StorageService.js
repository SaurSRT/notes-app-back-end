const fs = require('fs');

class StorageService {
  /**
   * @param {string} folder - Path folder tujuan penyimpanan
   */
  constructor(folder) {
    this._folder = folder;

    // Membuat direktori jika belum ada secara rekursif
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true });
    }
  }

  /**
   * Fungsi untuk menuliskan berkas ke lokal storage menggunakan stream
   * @param {ReadableStream} file - Berkas dari payload request (stream)
   * @param {object} meta - Informasi metadata berkas
   */
  writeFile(file, meta) {
    // Membuat nama berkas unik dengan timestamp
    const filename = +new Date() + meta.filename;
    const path = `${this._folder}/${filename}`;

    // Membuat writable stream berdasarkan path
    const fileStream = fs.createWriteStream(path);

    return new Promise((resolve, reject) => {
      // Menangani error pada proses penulisan
      fileStream.on('error', (error) => reject(error));

      // Mengalirkan data dari readable (file) ke writable (fileStream)
      file.pipe(fileStream);

      // Setelah selesai, kirimkan nama berkas hasil resolve
      file.on('end', () => resolve(filename));
    });
  }
}

module.exports = StorageService;