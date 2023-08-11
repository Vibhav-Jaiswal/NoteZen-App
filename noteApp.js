
const addTitle = document.getElementById('addTitle');
const addText = document.getElementById('addText');
const addNoteButton = document.getElementById('addNote');
const notesDiv = document.getElementById('notes');
const deletedNotesList = document.getElementById('deletedNotesList');

// Show existing notes and deleted notes when the page loads
showNotes();
showDeletedNotes();

// Function to add a new note
function addNotes(){
    // Retrieve notes from local storage or initialize an empty array
    let notes = getNotesFromLocalStorage();

    // Check if the note text is empty
    if(addText.value === ''){
        alert('Add your note');
        return;
    }

    // Create a note object
    const noteObj = {
        title: addTitle.value,
        text: addText.value,
    };

    // Clear input fields
    addTitle.value = '';
    addText.value = '';

    // Push the new note to the notes array
    notes.push(noteObj);

    // Save the updated notes array to local storage
    saveNotesToLocalStorage(notes);

    // Display the updated notes
    showNotes();
}

// Function to display existing notes
function showNotes() {
    let notesHTML = '';
    let notes = getNotesFromLocalStorage();

    // Generate HTML for each note
    for (let i = 0; i < notes.length; i++) {
        notesHTML += `
            <div class="note">
                <button class="deleteNote" id="${i}" onclick="deleteNote(${i})">Delete</button>
                <div class="title">${notes[i].title === '' ? 'Note' : notes[i].title}</div>
                <div class="text">${notes[i].text}</div>
            </div>
        `;
    }

    // Update the HTML content of the notesDiv
    notesDiv.innerHTML = notesHTML;
}

// Function to delete a note
function deleteNote(ind) {
    // Retrieve notes from local storage
    let notes = getNotesFromLocalStorage();

    // Retrieve deleted notes from local storage or initialize an empty array
    let deletedNotes = getDeletedNotesFromLocalStorage();

    // Move the note from notes to deletedNotes
    deletedNotes.push(notes[ind]);
    notes.splice(ind, 1);

    // Save the updated notes and deleted notes arrays to local storage
    saveNotesToLocalStorage(notes);
    saveDeletedNotesToLocalStorage(deletedNotes);

    // Display the updated notes and deleted notes
    showNotes();
    showDeletedNotes();
}

// Function to restore a deleted note
function restoreNote(ind) {
    // Retrieve deleted notes from local storage
    let deletedNotes = getDeletedNotesFromLocalStorage();

    // Retrieve notes from local storage
    let notes = getNotesFromLocalStorage();

    // Move the note from deletedNotes to notes
    notes.push(deletedNotes[ind]);
    deletedNotes.splice(ind, 1);

    // Save the updated notes and deleted notes arrays to local storage
    saveNotesToLocalStorage(notes);
    saveDeletedNotesToLocalStorage(deletedNotes);

    // Display the updated notes and deleted notes
    showNotes();
    showDeletedNotes();
}

// Function to display deleted notes
function showDeletedNotes() {
    let deletedNotesHTML = '';
    let deletedNotes = getDeletedNotesFromLocalStorage();

    // Generate HTML for each deleted note
    for (let i = 0; i < deletedNotes.length; i++) {
        deletedNotesHTML += `
            <div class="note">
                <button class="restoreNote" id="${i}" onclick="restoreNote(${i})">Restore</button>
                <div class="title">${deletedNotes[i].title === '' ? 'Note' : deletedNotes[i].title}</div>
                <div class="text">${deletedNotes[i].text}</div>
            </div>
        `;
    }

    // Update the HTML content of the deletedNotesList
    deletedNotesList.innerHTML = deletedNotesHTML;
}

// Function to get notes from local storage
function getNotesFromLocalStorage() {
    let notes = localStorage.getItem('notes');
    return notes === null ? [] : JSON.parse(notes);
}

// Function to get deleted notes from local storage
function getDeletedNotesFromLocalStorage() {
    let deletedNotes = localStorage.getItem('deletedNotes');
    return deletedNotes === null ? [] : JSON.parse(deletedNotes);
}

// Function to save notes to local storage
function saveNotesToLocalStorage(notes) {
    localStorage.setItem('notes', JSON.stringify(notes));
}

// Function to save deleted notes to local storage
function saveDeletedNotesToLocalStorage(deletedNotes) {
    localStorage.setItem('deletedNotes', JSON.stringify(deletedNotes));
}

// Add event listener to the "Add" button
addNoteButton.addEventListener('click', addNotes);
