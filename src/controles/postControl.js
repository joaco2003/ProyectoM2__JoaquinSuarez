const postService = require('../service/postService');

const getPosts = async (req, res, next) => {
    try {
        const posts = await postService.getAllPosts();
        res.status(200).json(posts);
    } catch (error) { next(error); }
};

const getPost = async (req, res, next) => {
    try {
        const post = await postService.getPostById(req.params.id);
        if (!post) return res.status(404).json({ error: 'Publicación no encontrada' });
        res.status(200).json(post);
    } catch (error) { next(error); }
};

const getAuthorPosts = async (req, res, next) => {
    try {
        const posts = await postService.getPostsByAuthorId(req.params.authorId);
        res.status(200).json(posts);
    } catch (error) { next(error); }
};

const createPost = async (req, res, next) => {
    try {
        const { author_id, title, content, published } = req.body;
        const newPost = await postService.createPost(author_id, title, content, published);
        res.status(201).json(newPost);
    } catch (error) { next(error); }
};

const updatePost = async (req, res, next) => {
    try {
        const { title, content, published } = req.body;
        const updatedPost = await postService.updatePost(req.params.id, title, content, published);
        if (!updatedPost) return res.status(404).json({ error: 'Publicación no encontrada para actualizar' });
        res.status(200).json(updatedPost);
    } catch (error) { next(error); }
};

const deletePost = async (req, res, next) => {
    try {
        const deleted = await postService.deletePost(req.params.id);
        if (!deleted) return res.status(404).json({ error: 'Publicación no encontrada' });
        res.status(204).send();
    } catch (error) { next(error); }
};

module.exports = { getPosts, getPost, getAuthorPosts, createPost, updatePost, deletePost };