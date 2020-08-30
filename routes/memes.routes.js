const express = require('express');
const {
  getMemes, getMeme, createMeme, updateMeme, deleteMeme,
} = require('../controllers/memes.controller');

const router = express.Router();

router.get('/', getMemes);
router.get('/:id', getMeme);
router.post('/', createMeme);
router.patch('/:id', updateMeme);
router.delete('/:id', deleteMeme);

module.exports = router;
