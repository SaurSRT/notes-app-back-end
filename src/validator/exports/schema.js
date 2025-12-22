const Joi = require('joi');

const ExportNotesPayloadSchema = Joi.object({
  // Mengharuskan targetEmail berupa string format email yang valid
  // tlds: true memastikan domain email memiliki TLD yang terdaftar (misal .com, .id)
  targetEmail: Joi.string().email({ tlds: true }).required(),
});

module.exports = ExportNotesPayloadSchema;