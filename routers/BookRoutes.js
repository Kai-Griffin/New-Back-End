import {fetchBooks, createBooks, editBook, deleteBook} from '../controllers/BookController.js'
import express from 'express'

const bookRoutes = express.Router();

bookRoutes.get('/all', fetchBooks);
bookRoutes.post('/new', createBooks);
bookRoutes.put('/edit/:bookId', editBook);
bookRoutes.delete('/delete/:BookId', deleteBook);

export default bookRoutes;

