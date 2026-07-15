const db = require('../Configuracion/db');

const getAllAuthors = async () => {
    const { rows } = await db.query('SELECT * FROM authors ORDER BY id ASC');
    return rows;
};

const getAuthorById = async (id) => {
    const { rows } = await db.query('SELECT * FROM authors WHERE id = $1', [id]);
    return rows[0];
};

const createAuthor = async (name, email, bio = '') => {
    const query = `
        INSERT INTO authors (name, email, bio)
        VALUES ($1, $2, $3)
        RETURNING *;
    `;
    const { rows } = await db.query(query, [name, email, bio]);
    return rows[0];
};

const updateAuthor = async (id, name, email, bio) => {
    const query = `
        UPDATE authors
        SET name = $1, email = $2, bio = $3
        WHERE id = $4
        RETURNING *;
    `;
    const { rows } = await db.query(query, [name, email, bio, id]);
    return rows[0];
};

const deleteAuthor = async (id) => {
    const { rowCount } = await db.query('DELETE FROM authors WHERE id = $1', [id]);
    return rowCount > 0;
};

module.exports = { getAllAuthors, getAuthorById, createAuthor, updateAuthor, deleteAuthor };