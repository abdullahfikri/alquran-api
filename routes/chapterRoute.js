import { Router } from 'express';
import { getAllChapter, getChapter } from '../controllers/Chapter.js';

const router = Router();

router.get('/', getAllChapter);
router.get('/:id_chapter', getChapter);

export default router;
