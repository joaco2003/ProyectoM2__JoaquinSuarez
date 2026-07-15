const express = require('express');
const router = express.Router();
const ctrl = require('../controles/commentControl');
const { validateComment } = require('../middlewares/validacion');


router.get('/', ctrl.getAllComments);
router.get('/post/:postId', ctrl.getCommentsByPost);
router.post('/', validateComment, ctrl.createComment);
router.delete('/:id', ctrl.deleteComment);

module.exports = router;