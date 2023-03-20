import {
    getVerseByJuz,
    getVerseByChapter,
    getUthmaniVerseByJuz,
    getImlaeiVerseByJuz,
    getIndopakVerseByJuz,
    getUthmaniVerseByChapter,
    getImlaeiVerseByChapter,
    getIndopakVerseByChapter,
    getSingleVerse,
    getUthmaniSingleVerse,
    getImlaeiSingleVerse,
    getIndopakSingleVerse,
} from '../controllers/Verse.js';
import express from 'express';

const router = express.Router();

// ROUTER GET SIGLE VERSE
router.get('/:id_verse', getSingleVerse);
router.get('/uthmani/:id_verse', getUthmaniSingleVerse);
router.get('/imlaei/:id_verse', getImlaeiSingleVerse);
router.get('/indopak/:id_verse', getIndopakSingleVerse);

// ROUTER GET BY JUZ
router.get('/by_juz/:id_juz', getVerseByJuz);
router.get('/uthmani/by_juz/:id_juz', getUthmaniVerseByJuz);
router.get('/imlaei/by_juz/:id_juz', getImlaeiVerseByJuz);
router.get('/indopak/by_juz/:id_juz', getIndopakVerseByJuz);

// ROUTER GET BY CHAPTER
router.get('/by_chapter/:id_chapter', getVerseByChapter);
router.get('/uthmani/by_chapter/:id_chapter', getUthmaniVerseByChapter);
router.get('/imlaei/by_chapter/:id_juz', getImlaeiVerseByChapter);
router.get('/indopak/by_chapter/:id_juz', getIndopakVerseByChapter);

export default router;
