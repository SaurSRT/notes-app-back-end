const mapDBToModel = ({
  id,
  title,
  body,
  tags,
  created_at,
  updated_at,
}) => ({
  id,
  title,
  body,
  tags,
  createdAt: created_at, // Ubah created_at jadi createdAt
  updatedAt: updated_at, // Ubah updated_at jadi updatedAt
});

module.exports = { mapDBToModel };