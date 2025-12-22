const InvariantError = require('../../exceptions/InvariantError');
const { ImageHeadersSchema } = require('./schema');

const UploadsValidator = {
  validateImageHeaders: (headers) => {
    const validationResult = ImageHeadersSchema.validate(headers);

    if (validationResult.error) {
      // Melemparkan error 400 jika header tidak sesuai (bukan gambar)
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = UploadsValidator;