const db = require('../configuracion/db');

const getAllPosts = async () => {
    const { rows } = await db.query('SELECT * FROM posts ORDER BY created_at DESC');
    return rows;
};

const getPostById = async (id) => {
    const { rows } = await db.query('SELECT * FROM posts WHERE id = $1', [id]);
    return rows[0];
};

const getPostsByAuthorId = async (authorId) => {
    // Retorna el post y anida el detalle del autor usando JSON en la consulta SQL
    const query = `
        SELECT p.*,
            json_build_object(
                'id', a.id,
                'name', a.name,
                'email', a.email,
                'bio', a.bio
            ) AS author
        FROM posts p
        JOIN authors a ON p.author_id = a.id
        WHERE p.author_id = $1
        ORDER BY p.created_at DESC;
    `;
    const { rows } = await db.query(query, [authorId]);
    return rows;
};

const createPost = async (author_id, title, content, published = false) => {
    const query = `
        INSERT INTO posts (author_id, title, content, published)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
    `;
    const { rows } = await db.query(query, [author_id, title, content, published]);
    return rows[0];
};

const updatePost = async (id, title, content, published) => {
    const query = `
        UPDATE posts
        SET title = $1, content = $2, published = $3
        WHERE id = $4
        RETURNING *;
    `;
    const { rows } = await db.query(query, [title, content, published, id]);
    return rows[0];
};

const deletePost = async (id) => {
    const { rowCount } = await db.query('DELETE FROM posts WHERE id = $1', [id]);
    return rowCount > 0;
};

module.exports = { getAllPosts, getPostById, getPostsByAuthorId, createPost, updatePost, deletePost };