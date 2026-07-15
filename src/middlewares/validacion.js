const validateAuthor = (req, res, next) => {
    const { name, email } = req.body;
    if (!name || name.trim() === '') {
        return res.status(400).json({ error: 'El campo name no puede estar vacío.' });
    }
    if (!email || !email.includes('@')) {
        return res.status(400).json({ error: 'Debe proveer un email válido.' });
    }
    next();
};

const validatePost = (req, res, next) => {
    const { author_id, title, content } = req.body;
    if (!author_id || isNaN(author_id)) {
        return res.status(400).json({ error: 'author_id es obligatorio y debe ser un número.' });
    }
    if (!title || title.trim() === '') {
        return res.status(400).json({ error: 'El campo titulo no puede estar vacío.' });
    }
    if (!content || content.trim() === '') {
        return res.status(400).json({ error: 'El campo content no puede estar vacío.' });
    }
    next();
};

const validateComment = (req, res, next) => {
    const { post_id, author_id, content } = req.body;
    if (!post_id || isNaN(post_id) || !author_id || isNaN(author_id)) {
        return res.status(400).json({ error: 'post_id y author_id son obligatorios y numéricos.' });
    }
    if (!content || content.trim() === '') {
        return res.status(400).json({ error: 'El campo content no puede estar vacío.' });
    }
    next();
};

module.exports = { validateAuthor, validatePost, validateComment };