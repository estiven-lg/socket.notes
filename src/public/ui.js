const notesHtml = document.querySelector("#notes");

const noteUI = ({ id, title, description }) => {
  const div = document.createElement("div");

  div.innerHTML += `
        <div class="card card-body">
          <div class="d-flex justify-content-between">
              <h1 class="h3 card-body">${title}</h1>
              <div>
                  <button class="btn btn-danger delete" data-id="${id}">detele</button>
                  <button class="btn btn-secondary update" data-id="${id}">update</button>
              </div>
          </div>
          <p>${description}</p>
        </div>
`;

  const btnDelete = div.querySelector(".delete");
  btnDelete.addEventListener("click", () => deleteNote(btnDelete.dataset.id));

  const btnUpdate = div.querySelector(".update");
  btnUpdate.addEventListener("click", () => getNote(btnUpdate.dataset.id));
  return div;
};

const renderNote = (note) => notesHtml.append(noteUI(note));

const renderNotes = (notes) => notes.forEach(renderNote);

const re_renderNotes = (notes) => {
  notesHtml.innerHTML = "";
  notes.forEach(renderNote);
};
