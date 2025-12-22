const Joi = require('joi');

const ImageHeadersSchema = Joi.object({
  // Menentukan daftar MIME type gambar yang valid
  'content-type': Joi.string().valid(
    'image/apng', 
    'image/avif', 
    'image/gif', 
    'image/jpeg', 
    'image/png', 
    'image/webp'
  ).required(),
}).unknown(); // Mengizinkan properti header lain selain content-type

module.exports = { ImageHeadersSchema };