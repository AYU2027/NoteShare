import { Router } from 'express';

import { getNotes, createNote, shareNote, deleteNote, updateNote } from '../controllers/notes.controller';
import { protect } from '../middleware/auth.middleware';
const router = Router();

router.route('/').get(protect, getNotes).post(protect, createNote);

router.post('/share/:id', protect, shareNote);

router.route('/:id')
.delete(protect, deleteNote)
.put(protect, updateNote); 
export default router;