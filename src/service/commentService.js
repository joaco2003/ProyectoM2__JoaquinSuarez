const db = require('../Configuracion/db');

const getCommentsByPostId = async (postId) => {
    const query = `
        SELECT c.*,
            json_build_object('id', a.id, 'name', a.name) AS author
        FROM comments c
        JOIN authors a ON c.author_id = a.id
        WHERE c.post_id = $1
        ORDER BY c.created_at ASC;
    `;
    const { rows } = await db.query(query, [postId]);
    return rows;
};
const getAllComments = async () => {
    const query = `
        SELECT c.*,
            json_build_object('id', a.id, 'name', a.name) AS author
        FROM comments c
        LEFT JOIN authors a ON c.author_id = a.id
        ORDER BY c.created_at ASC;
    `;
    const { rows } = await db.query(query);
    return rows;
};
const createComment = async (post_id, author_id, content) => {
    const query = `
        INSERT INTO comments (post_id, author_id, content)
        VALUES ($1, $2, $3)
        RETURNING *;
    `;
    const { rows } = await db.query(query, [post_id, author_id, content]);
    return rows[0];
};

const deleteComment = async (id) => {
    const { rowCount } = await db.query('DELETE FROM comments WHERE id = $1', [id]);
    return rowCount > 0;
};

module.exports = { getCommentsByPostId, getAllComments, createComment, deleteComment };