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

function editNote(targetId, updatedData) {
  const notes = JSON.parse(localStorage.getItem("notes")) || [];
  const index = notes.findIndex((note) => note.id === targetId);
  if (index === -1) {
    console.error("Note not found for edit:", targetId);
    return false;
  }
  notes[index] = {
    ...notes[index],
    ...updatedData,
    id: notes[index].id,
    updatedAt: Date.now(),
  };
  localStorage.setItem("notes", JSON.stringify(notes));
  return true;
}

function deleteNote(targetId) {
  const notes = JSON.parse(localStorage.getItem("notes")) || [];
  const filtered = notes.filter((note) => note.id !== targetId);
  localStorage.setItem("notes", JSON.stringify(filtered));
  return true;
}
