import { Router } from 'express';
import { getAllChapter } from '../controllers/Chapter.js';

const router = Router();

router.get('/getchapter', getAllChapter);

export default router;
