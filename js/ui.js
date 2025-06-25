const newButton = document.getElementById("new-note-btn");
const sidePanel = document.getElementById("note-editor");
const closeButton = document.getElementById("close-editor-btn");
const cancelButton = document.getElementById("cancel-btn");
const saveButton = document.getElementById("save-btn");
let notes = [];
let panelMode = "add";

function openNoteEditor(event) {
  if (sidePanel.classList.contains("hidden")) {
    sidePanel.classList.remove("hidden");
    document.getElementById("note-title").focus();
  }
}

function closeNoteEditor(event) {
  sidePanel.classList.add("hidden");
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

  let isSaved = saveNote(note);

  if (isSaved) {
    notes = getNotes();
    renderNotes();
    title.value = "";
    content.value = "";
    tags.value = "";
  }

  closeNoteEditor();
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
