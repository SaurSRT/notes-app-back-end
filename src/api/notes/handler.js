class NotesHandler {
  constructor(service) {
    this._service = service;
  }

  postNoteHandler(request, h) {
    try {
      // PERBAIKAN 1: gunakan request.payload
      const { title = 'untitled', body, tags } = request.payload;

      const noteId = this._service.addNote({ title, body, tags });

      const response = h.response({
        status: 'success',
        message: 'Catatan berhasil ditambahkan',
        data: {
          noteId,
        },
      });
      response.code(201);
      return response;
    } catch (error) {
      const response = h.response({
        status: 'fail',
        message: error.message,
      });
      response.code(400);
      return response;
    }
  }

  getNotesHandler() {
    const notes = this._service.getNotes();
    return {
      status: 'success',
      data: {
        notes,
      },
    };
  }

  // PERBAIKAN 2: Tambahkan parameter (request, h)
  getNoteByIdHandler(request, h) {
    try {
      const { id } = request.params;
      const note = this._service.getNoteById(id);
      return {
        status: 'success',
        data: {
          note,
        },
      };
    } catch (error) {
      const response = h.response({
        status: 'fail',
        message: error.message,
      });
      response.code(404);
      return response;
    }
  }

  // PERBAIKAN 3: Tambahkan parameter (request, h)
  putNoteByIdHandler(request, h) {
    try {
      const { id } = request.params;
      this._service.editNoteById(id, request.payload);

      return {
        status: 'success',
        message: 'Catatan berhasil diperbarui',
      };
    } catch (error) {
      const response = h.response({
        status: 'fail',
        message: error.message,
      });
      response.code(404);
      // PERBAIKAN 4: return response (bukan return.response)
      return response;
    }
  }

  deleteNoteByIdHandler(request, h) {
      const { id } = request.params;
      this._service.deleteNoteById(id);
      return {
        status : 'success',
        message : 'Catatan berhasil dihapus',
      };
  } catch (error) {
    const response = h.response ({
        status : 'fail',
        message : error.message,
    });
    response.code(404);
    return response
  }
}

module.exports = NotesHandler;