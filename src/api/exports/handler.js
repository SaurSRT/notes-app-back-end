class ExportsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    // Supaya keyword 'this' tidak hilang saat dipanggil di routes
    this.postExportNotesHandler = this.postExportNotesHandler.bind(this);
  }

  async postExportNotesHandler(request, h) {
    // 1. Validasi payload (email)
    this._validator.validateExportNotesPayload(request.payload);

    // 2. Siapkan data yang akan dikirim ke antrean
    const message = {
      userId: request.auth.credentials.id,
      targetEmail: request.payload.targetEmail,
    };

    // 3. Kirim pesan ke RabbitMQ (Nama antrean: 'export:notes')
    // Jangan lupa di-stringify karena service kita nerima string
    await this._service.sendMessage('export:notes', JSON.stringify(message));

    // 4. Beri respon 201 (Created/Accepted)
    const response = h.response({
      status: 'success',
      message: 'Permintaan Anda dalam antrean',
    });
    response.code(201);
    return response;
  }
}

module.exports = ExportsHandler;