class UploadsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    // Melakukan bind agar konteks 'this' tidak hilang
    this.postUploadImageHandler = this.postUploadImageHandler.bind(this);
  }

  async postUploadImageHandler(request, h) {
    // Mendapatkan data (stream) dari payload
    const { data } = request.payload;

    // Memvalidasi headers untuk memastikan berkas adalah gambar
    this._validator.validateImageHeaders(data.hapi.headers);

    // Menulis berkas ke storage dan mendapatkan nama berkasnya
    const filename = await this._service.writeFile(data, data.hapi);

    const response = h.response({
      status: 'success',
      data: {
        // Membuat URL lokasi berkas secara dinamis
        fileLocation: `http://${process.env.HOST}:${process.env.PORT}/upload/images/${filename}`,
      },
    });
    response.code(201);
    return response;
  }
}

module.exports = UploadsHandler;