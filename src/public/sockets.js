const socket = io();

const saveNote = (note) => socket.emit("client:newNote", note);

const deleteNote = (noteId) => socket.emit("client:deleteNote", noteId);

const updateNote = (note) => socket.emit("client:updateNote", note);

const getNote = (noteId) => {
  socket.emit("client:getNote", noteId);
  socket.on("server:getNote", ({ title, description, id }) => {
    document.querySelector("#idNote").value = id;
    document.querySelector("#title").value = title;
    document.querySelector("#description").value = description;
  });
};

socket.on("server:newNote", renderNote);

socket.on("server:loadNotes", renderNotes);

socket.on("server:deleteNote", re_renderNotes);

socket.on("server:updateNote", re_renderNotes);
