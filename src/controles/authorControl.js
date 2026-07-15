const authorService = require('../service/authorservice');

const getAuthors = async (req, res, next) => {
    try {
        const authors = await authorService.getAllAuthors();
        res.status(200).json(authors);
    } catch (error) { next(error); }
};

const getAuthor = async (req, res, next) => {
    try {
        const author = await authorService.getAuthorById(req.params.id);
        if (!author) return res.status(404).json({ error: 'Autor no encontrado' });
        res.status(200).json(author);
    } catch (error) { next(error); }
};

const createAuthor = async (req, res, next) => {
    try {
        const { name, email, bio } = req.body;
        const newAuthor = await authorService.createAuthor(name, email, bio);
        res.status(201).json(newAuthor);
    } catch (error) { next(error); }
};

const updateAuthor = async (req, res, next) => {
    try {
        const { name, email, bio } = req.body;
        const updatedAuthor = await authorService.updateAuthor(req.params.id, name, email, bio);
        if (!updatedAuthor) return res.status(404).json({ error: 'Autor no encontrado para actualizar' });
        res.status(200).json(updatedAuthor);
    } catch (error) { next(error); }
};

const deleteAuthor = async (req, res, next) => {
    try {
        const deleted = await authorService.deleteAuthor(req.params.id);
        if (!deleted) return res.status(404).json({ error: 'Autor no encontrado' });
        res.status(204).send();
    } catch (error) { next(error); }
};

module.exports = { getAuthors, getAuthor, createAuthor, updateAuthor, deleteAuthor };