import {
    getVerseByJuz,
    getUthmaniVerseById,
    getVerseByChapter,
} from '../controllers/Verse.js';
import express from 'express';

const router = express.Router();

router.get('/by_juz/:id_juz', getVerseByJuz);
router.get('/by_chapter/:id_chapter', getVerseByChapter);
// router.get('/uthmani', getUthmaniVerseById);

export default router;
