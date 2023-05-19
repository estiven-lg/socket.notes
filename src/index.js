import express from "express";
import { Server as WebSocket } from "socket.io";
import http from "http";
import path from "path";
import { fileURLToPath } from "url";
import { v4 as uuid } from "uuid";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const httpServer = http.createServer(app);
const io = new WebSocket(httpServer);

let notes = [];

app.use(express.static(__dirname + "/public"));

io.on("connection", (socket) => {
  console.log("new coneccion:", socket.id);
  socket.emit("server:loadNotes", notes);

  socket.on("client:newNote", ({ title, description }) => {
    const note = { id: uuid(), title, description };

    notes.push(note);
    io.emit("server:newNote", note);
  });

  socket.on("client:deleteNote", (noteId) => {
    notes = notes.filter(({ id }) => id !== noteId);
    io.emit("server:deleteNote", notes);
  });

  socket.on("client:getNote", (noteId) => {
    const note = notes.find(({ id }) => id === noteId);
    socket.emit("server:getNote",note);
  });

  socket.on("client:updateNote",(newNote)=>{
    notes = notes.map((note)=>(note.id=== newNote.id) ? newNote : note);
    io.emit('server:updateNote',notes);
  })
});

httpServer.listen(3000);
console.log("server on port", 3000);
