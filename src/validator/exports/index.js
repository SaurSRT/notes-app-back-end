const ExportNotesPayloadSchema = require('./schema');
const InvariantError = require('../../exceptions/InvariantError');

const ExportsValidator = {
  validateExportNotesPayload: (payload) => {
    const validationResult = ExportNotesPayloadSchema.validate(payload);

    if (validationResult.error) {
      // Jika error, kita lempar InvariantError agar ditangkap oleh response 400 Bad Request
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = ExportsValidator;