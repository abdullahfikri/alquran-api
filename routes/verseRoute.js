import {
    getVerseByJuz,
    getVerseByChapter,
    getUthmaniVerseByJuz,
    getImlaeiVerseByJuz,
    getIndopakVerseByJuz,
    getUthmaniVerseByChapter,
} from '../controllers/Verse.js';
import express from 'express';

const router = express.Router();

router.get('/by_juz/:id_juz', getVerseByJuz);
router.get('/uthmani/by_juz/:id_juz', getUthmaniVerseByJuz);
router.get('/imlaei/by_juz/:id_juz', getImlaeiVerseByJuz);
router.get('/indopak/by_juz/:id_juz', getIndopakVerseByJuz);

router.get('/by_chapter/:id_chapter', getVerseByChapter);
router.get('/uthmani/by_chapter/:id_chapter', getUthmaniVerseByChapter);

export default router;
