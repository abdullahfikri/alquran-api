import { getRecitation, getAudios } from '../controllers/Recitation.js';
import express from 'express';

const router = express.Router();
router.get('/', getRecitation);
router.get('/:id_audio', getAudios);

export default router;
