const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

let notes = [];
let nextId = 1;

// Get all notes
app.get('/notes', (req, res) => {
  res.json(notes);
});

// Get note by ID
app.get('/notes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const note = notes.find(n => n.id === id);
  
  if (!note) {
    return res.status(404).json({ error: 'Note not found' });
  }
  
  res.json(note);
});

// Create new note
app.post('/notes', (req, res) => {
  const { title, content } = req.body;
  
  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }
  
  const newNote = {
    id: nextId++,
    title,
    content,
    createdAt: new Date().toISOString()
  };
  
  notes.push(newNote);
  res.status(201).json(newNote);
});

// Update note
app.put('/notes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { title, content } = req.body;
  const noteIndex = notes.findIndex(n => n.id === id);
  
  if (noteIndex === -1) {
    return res.status(404).json({ error: 'Note not found' });
  }
  
  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }
  
  notes[noteIndex] = {
    ...notes[noteIndex],
    title,
    content,
    updatedAt: new Date().toISOString()
  };
  
  res.json(notes[noteIndex]);
});

// Delete note
app.delete('/notes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const noteIndex = notes.findIndex(n => n.id === id);
  
  if (noteIndex === -1) {
    return res.status(404).json({ error: 'Note not found' });
  }
  
  notes = notes.filter(n => n.id !== id);
  res.status(204).send();
});

// Error handling middleware - remove unused parameter completely
app.use((err, req, res) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

app.listen(PORT, () => {
  console.log(`Notes app listening on port ${PORT}`);
});

module.exports = app;
