import { getWordByChapter, getWordByJuz } from '../controllers/WordVerse.js';
import express from 'express';

const router = express.Router();

router.get('/by_chapter/:id_chapter', getWordByChapter);
router.get('/by_juz/:id_juz', getWordByJuz);

export default router;
