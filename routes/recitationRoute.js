import { getRecitation } from '../controllers/Recitation.js';
import express from 'express';

const router = express.Router();
router.get('/', getRecitation);

export default router;
