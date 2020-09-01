const express = require('express');
const {
  getMemes, getMeme, createMeme, updateMeme, deleteMeme,
} = require('../controllers/meme.controller');
const { auth } = require('../middleware/auth');

const router = express.Router();

router.get('/', getMemes);
router.get('/:id', getMeme);
router.post('/', auth, createMeme);
router.patch('/:id', auth, updateMeme);
router.delete('/:id', auth, deleteMeme);

module.exports = router;
