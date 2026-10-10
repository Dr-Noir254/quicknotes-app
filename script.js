const noteForm = document.querySelector('#note-form');
const noteInput = document.querySelector('#note-input');
const noteCategory = document.querySelector('#note-category');
const searchInput = document.querySelector('#search-input');
const notesList = document.querySelector('#notes-list');
const noteCount = document.querySelector('#note-count');
const errorMessage = document.querySelector('#error-message');
const clearAllButton = document.querySelector('#clear-all-btn');
const STORAGE_KEY = 'quicknotes-notes';

let notes = loadNotes();

function loadNotes() {
  try {
    const savedNotes = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!Array.isArray(savedNotes)) return [];
    return savedNotes.filter((note) => note && typeof note.id === 'string' && typeof note.text === 'string' && typeof note.category === 'string' && typeof note.createdAt === 'string');
  } catch (error) {
    console.warn('Could not load saved notes:', error);
    return [];
  }
}

function saveNotes() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  } catch (error) {
    errorMessage.textContent = 'Your notes could not be saved in this browser.';
    console.error('Could not save notes:', error);
  }
}

function updateCount() {
  const count = notes.length;
  if (count === 0) noteCount.textContent = 'You have no notes yet.';
  else if (count === 1) noteCount.textContent = 'You have 1 note.';
  else noteCount.textContent = `You have ${count} notes.`;
}

function createNoteElement(note) {
  const item = document.createElement('li');
  const categoryClass = ['Personal', 'Work', 'Study'].includes(note.category) ? note.category.toLowerCase() : 'personal';
  item.className = `note-card category-${categoryClass}`;

  const text = document.createElement('p');
  text.className = 'note-content';
  text.textContent = note.text;
  item.appendChild(text);

  const meta = document.createElement('div');
  meta.className = 'note-meta';
  const metaLeft = document.createElement('div');
  metaLeft.className = 'note-meta-left';
  const category = document.createElement('span');
  category.className = 'category-label';
  category.textContent = note.category;
  const date = document.createElement('time');
  date.className = 'note-date';
  date.textContent = note.createdAt;
  metaLeft.append(category, date);

  const deleteButton = document.createElement('button');
  deleteButton.className = 'delete-button';
  deleteButton.type = 'button';
  deleteButton.textContent = 'Delete';
  deleteButton.setAttribute('aria-label', `Delete note: ${note.text.slice(0, 45)}`);
  deleteButton.addEventListener('click', () => deleteNote(note.id));
  meta.append(metaLeft, deleteButton);
  item.appendChild(meta);
  return item;
}

function render() {
  notesList.replaceChildren();
  const query = searchInput.value.trim().toLocaleLowerCase();
  const filteredNotes = notes.filter((note) => note.text.toLocaleLowerCase().includes(query));

  if (filteredNotes.length === 0) {
    const emptyItem = document.createElement('li');
    emptyItem.className = 'empty-state';
    emptyItem.textContent = query ? 'No notes match your search.' : 'Your notes will appear here after you add one.';
    notesList.appendChild(emptyItem);
  } else {
    filteredNotes.forEach((note) => notesList.appendChild(createNoteElement(note)));
  }
  updateCount();
}

function deleteNote(id) {
  notes = notes.filter((note) => note.id !== id);
  saveNotes();
  render();
}

noteForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const text = noteInput.value.trim();

  if (!text) {
    errorMessage.textContent = 'Please type a note first.';
    noteInput.focus();
    return;
  }
  if (text.length > 200) {
    errorMessage.textContent = 'Notes must be 200 characters or fewer.';
    noteInput.focus();
    return;
  }

  notes.unshift({
    id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    text,
    category: noteCategory.value,
    createdAt: new Date().toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })
  });
  saveNotes();
  errorMessage.textContent = '';
  noteInput.value = '';
  searchInput.value = '';
  render();
  noteInput.focus();
});

searchInput.addEventListener('input', render);
clearAllButton.addEventListener('click', () => {
  if (notes.length === 0) return;
  if (confirm('Delete all notes?')) {
    notes = [];
    saveNotes();
    render();
  }
});
render();
