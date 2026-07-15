const express = require('express');
const router = express.Router();
const ctrl = require('../controles/postControl');
const { validatePost } = require('../middlewares/validacion');

router.get('/', ctrl.getPosts);
router.get('/author/:authorId', ctrl.getAuthorPosts);
router.get('/:id', ctrl.getPost);
router.post('/', validatePost, ctrl.createPost);
router.put('/:id', ctrl.updatePost);
router.delete('/:id', ctrl.deletePost);

module.exports = router;