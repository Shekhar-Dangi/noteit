const newButton = document.getElementById("new-note-btn");
const sidePanel = document.getElementById("note-editor");
const closeButton = document.getElementById("close-editor-btn");
const cancelButton = document.getElementById("cancel-btn");
const saveButton = document.getElementById("save-btn");

function openNoteEditor(event) {
  if (sidePanel.classList.contains("hidden")) {
    sidePanel.classList.remove("hidden");
    document.getElementById("note-title").focus();
  }
}

function closeNoteEditor(event) {
  sidePanel.classList.add("hidden");
}

function addNote(event) {
  event.preventDefault();

  let title = document.getElementById("note-title");
  let content = document.getElementById("note-content");
  let tags = document.getElementById("note-tag-input");
  let tagSet = new Set(tags.value.trim().split(" "));

  if (!title || !content) {
    alert("Empty value not allowed!");
    return;
  }

  const note = {
    id: Date.now().toString(),
    title: title.value.trim(),
    content: content.value.trim(),
    tags: [...tagSet],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };

  let isSaved = saveNote(note);

  if (isSaved) {
    console.log("hey");
    title.value = "";
    content.value = "";
    tags.value = "";
  }

  closeNoteEditor();
}

newButton.addEventListener("click", openNoteEditor);
closeButton.addEventListener("click", closeNoteEditor);
cancelButton.addEventListener("click", closeNoteEditor);

saveButton.addEventListener("click", addNote);

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" && !sidePanel.classList.contains("hidden")) {
    closeNoteEditor();
  }
});
