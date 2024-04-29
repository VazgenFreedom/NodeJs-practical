const express = require('express');
const app = express();
const PORT = 3000;

let books = [
  { id: 1, title: 'New Book 1', author: 'Charenc' },
  { id: 2, title: 'New Book 2', author: 'Sahyan' },
  { id: 3, title: 'New Book 3', author: 'Sevak' }
];


app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to Node.js practical page');
});
app.get('/books', (req, res) => {
  res.json(books);
});

app.get('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const book = books.find(book => book.id === id);
  if (book) {
    res.json(book);
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
});

app.post('/books', (req, res) => {
  const { title, author } = req.body;
  const id = books.length + 1; 
  const newBook = { id, title, author };
  books.push(newBook);
  res.status(201).json(newBook);
});

app.put('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { title, author } = req.body;
  const index = books.findIndex(book => book.id === id);
  if (index !== -1) {
    books[index] = { id, title, author };
    res.json(books[index]);
  } else {
    res.status(404).json({ message: "Book doesn't exist" });
  }
});

app.delete('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = books.findIndex(book => book.id === id);
  if (index !== -1) {
    books.splice(index, 1);
    res.json({ message: 'Book has been deleted' });
  } else {
    res.status(404).json({ message: "Book doesn't exist" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
