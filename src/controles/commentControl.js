const commentService = require('../service/commentService');

const getCommentsByPost = async (req, res, next) => {
    try {
        const comments = await commentService.getCommentsByPostId(req.params.postId);
        res.status(200).json(comments);
    } catch (error) { next(error); }
};

const getAllComments = async (req, res, next) => {
    try {
        const comments = await commentService.getAllComments();
        res.status(200).json(comments);
    } catch (error) { next(error); }
};

const createComment = async (req, res, next) => {
    try {
        const { post_id, author_id, content } = req.body;
        const newComment = await commentService.createComment(post_id, author_id, content);
        res.status(201).json(newComment);
    } catch (error) { next(error); }
};

const deleteComment = async (req, res, next) => {
    try {
        const deleted = await commentService.deleteComment(req.params.id);
        if (!deleted) return res.status(404).json({ error: 'Comentario no encontrado' });
        res.status(204).send();
    } catch (error) { next(error); }
};

module.exports = { getCommentsByPost, getAllComments, createComment, deleteComment };