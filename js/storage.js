function saveNote(note) {
  const notes = JSON.parse(localStorage.getItem("notes")) || [];
  notes.push(note);
  localStorage.setItem("notes", JSON.stringify(notes));
  return true;
}

function getNotes() {
  const notes = JSON.parse(localStorage.getItem("notes")) || [];
  return notes;
}
