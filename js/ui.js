const newButton = document.getElementById("new-note-btn");
const sidePanel = document.getElementById("note-editor");
const closeButton = document.getElementById("close-editor-btn");
const cancelButton = document.getElementById("cancel-btn");
const saveButton = document.getElementById("save-btn");
const noteTitle = document.getElementById("note-title");
const noteContent = document.getElementById("note-content");
let noteTags = document.getElementById("note-tag-input");

let viewButtons = null;
let editButtons = null;
let deleteButtons = null;
let currentId = null;

let notes = [];
let panelMode = "add";

function openNoteEditor(event) {
  if (sidePanel.classList.contains("hidden")) {
    sidePanel.classList.remove("hidden");
    document.getElementById("note-title").focus();
  }
}

function closeNoteEditor(event) {
  if (panelMode === "view") {
    panelMode = "edit";
    noteTitle.classList.remove("note-read-only");
    noteContent.classList.remove("note-read-only");
    noteTags.classList.remove("note-read-only");
  }
  sidePanel.classList.add("hidden");
  noteTitle.value = "";
  noteContent.value = "";
  noteTags.value = "";
}

function renderNotes() {
  const pinnedList = document.getElementById("pinned-notes-list");
  const allList = document.getElementById("all-notes-list");

  pinnedList.innerHTML = "";
  allList.innerHTML = "";

  if (!notes || notes.length === 0) {
    allList.innerHTML = '<div class="no-notes">No notes yet.</div>';
    pinnedList.innerHTML = "";
    return;
  }

  const pinnedNotes = notes.filter((note) => note.pinned);
  const otherNotes = notes.filter((note) => !note.pinned);

  function createNoteCard(note) {
    return `
      <div class="note-card" data-id="${note.id}">
        <div class="note-header">
          <h3 class="note-title">${note.title}</h3>
        </div>
        <div class="note-tags">
          ${note.tags
            .map((tag) => `<span class="tag-pill">${tag}</span>`)
            .join(" ")}
        </div>
        <div class="note-content">
          ${
            note.content.length > 100
              ? note.content.slice(0, 100) + "..."
              : note.content
          }
        </div>
        <div class="note-footer">
          <span class="note-date">${new Date(
            note.updatedAt
          ).toLocaleDateString()}</span>
        </div>
        <div class="note-actions">
          <button class="view-btn" title="View">👁️</button>
          <button class="pin-btn" title="Pin/Unpin">${
            note.pinned ? "📌" : "📍"
          }</button>
          <button class="edit-btn" title="Edit">✏️</button>
          <button class="delete-btn" title="Delete">🗑️</button>
        </div>
      </div>
    `;
  }

  if (pinnedNotes.length > 0) {
    pinnedList.innerHTML = pinnedNotes.map(createNoteCard).join("");
  } else {
    pinnedList.innerHTML = '<div class="no-notes">No pinned notes.</div>';
  }

  if (otherNotes.length > 0) {
    allList.innerHTML = otherNotes.map(createNoteCard).join("");
  } else {
    allList.innerHTML = '<div class="no-notes">No notes yet.</div>';
  }

  viewButtons = document.getElementsByClassName("view-btn");
  editButtons = document.getElementsByClassName("edit-btn");
  deleteButtons = document.getElementsByClassName("delete-btn");

  if (viewButtons) {
    Array.from(viewButtons).forEach((viewButton) => {
      viewButton.addEventListener("click", () => {
        let id = viewButton.parentElement.parentElement.dataset.id;
        viewNote(id);
      });
    });
  }
  if (editButtons) {
    Array.from(editButtons).forEach((editButton) => {
      editButton.addEventListener("click", () => {
        let id = editButton.parentElement.parentElement.dataset.id;
        editNoteUI(id);
      });
    });
  }
  if (deleteButtons) {
    Array.from(deleteButtons).forEach((deleteButton) => {
      deleteButton.addEventListener("click", () => {
        let id = deleteButton.parentElement.parentElement.dataset.id;
        if (confirm("Are you sure you want to delete this note?")) {
          deleteNote(id);
          notes = getNotes();
          renderNotes();
        }
      });
    });
  }
}

function addNote(event) {
  event.preventDefault();

  let title = document.getElementById("note-title");
  let content = document.getElementById("note-content");
  let tags = document.getElementById("note-tag-input");
  let tagSet = new Set(tags.value.trim().split(" "));

  if (!title.value.trim() || !content.value.trim()) {
    alert("Empty value not allowed!");
    return;
  }

  const note = {
    id: Date.now().toString(),
    title: title.value.trim(),
    content: content.value.trim(),
    tags: [...tagSet].filter((tag) => tag),
    pinned: false,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };

  let isSaved;

  if (panelMode === "add") isSaved = saveNote(note);
  else if (panelMode === "edit") {
    note.id = currentId;
    isSaved = editNote(note.id, note);
  }

  if (isSaved) {
    notes = getNotes();
    renderNotes();
    title.value = "";
    content.value = "";
    tags.value = "";
  }
  currentId = null;
  closeNoteEditor();
}

function viewNote(targetId) {
  panelMode = "view";

  noteTitle.readOnly = true;
  noteTitle.classList.add("note-read-only");

  noteContent.readOnly = true;
  noteContent.classList.add("note-read-only");

  noteTags.readOnly = true;
  noteTags.classList.add("note-read-only");

  let note = notes.find((n) => n.id === targetId);
  noteTitle.value = note.title;
  noteContent.value = note.content;
  noteTags.value = note.tags.join(" ");
  saveButton.style.display = "none";

  openNoteEditor();
}

function editNoteUI(targetId) {
  panelMode = "edit";
  let note = notes.find((n) => n.id === targetId);
  noteTitle.value = note.title;
  noteContent.value = note.content;
  noteTags.value = note.tags.join(" ");
  currentId = targetId;
  openNoteEditor();
}

function init() {
  notes = getNotes();
  renderNotes();

  // Event Listeners
  newButton.addEventListener("click", openNoteEditor);
  closeButton.addEventListener("click", closeNoteEditor);
  cancelButton.addEventListener("click", closeNoteEditor);

  saveButton.addEventListener("click", addNote);

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && !sidePanel.classList.contains("hidden")) {
      closeNoteEditor();
    }
  });
}

init();
