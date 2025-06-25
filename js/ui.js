const newButton = document.getElementById("new-note-btn");
const sidePanel = document.getElementById("note-editor");
const closeButton = document.getElementById("close-editor-btn");
const cancelButton = document.getElementById("cancel-btn");

function openNoteEditor(event) {
  if (sidePanel.classList.contains("hidden")) {
    sidePanel.classList.remove("hidden");
    document.getElementById("note-title").focus();
  }
}

function closeNoteEditor(event) {
  sidePanel.classList.add("hidden");
}

newButton.addEventListener("click", openNoteEditor);
closeButton.addEventListener("click", closeNoteEditor);
cancelButton.addEventListener("click", closeNoteEditor);

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" && !sidePanel.classList.contains("hidden")) {
    closeNoteEditor();
  }
});
