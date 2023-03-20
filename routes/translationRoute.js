import express from 'express';
import {
    getTranslations,
    getListTranslations,
} from '../controllers/translation.js';

const router = express.Router();

router.get('/', getListTranslations);
router.get('/:id_translation', getTranslations);

export default router;
