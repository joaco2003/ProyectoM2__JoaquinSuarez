const express = require('express');
const router = express.Router();
const ctrl = require('../controles/authorControl');
const { validateAuthor } = require('../middlewares/validacion');

router.get('/', ctrl.getAuthors);
router.get('/:id', ctrl.getAuthor);
router.post('/', validateAuthor, ctrl.createAuthor);
router.put('/:id', validateAuthor, ctrl.updateAuthor);
router.delete('/:id', ctrl.deleteAuthor);

module.exports = router;