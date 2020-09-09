import { Router } from 'express';
import {
  getMemes, getMeme, createMeme, updateMeme, deleteMeme,
} from '../controllers/meme.controller';
import auth from '../middleware/auth';

const router = Router();

router.get('/', getMemes);
router.get('/:id', getMeme);
router.post('/', auth, createMeme);
router.patch('/:id', auth, updateMeme);
router.delete('/:id', auth, deleteMeme);

export default router;
