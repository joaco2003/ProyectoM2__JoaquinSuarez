const request = require('supertest');
const app = require('../src/app');
const db = require('../src/configuracion/db');

beforeAll(async () => {
    // Limpiar tablas para test limpio
    await db.query('DELETE FROM comments;');
    await db.query('DELETE FROM posts;');
    await db.query('DELETE FROM authors;');
});

afterAll(async () => {
    await db.pool.end();
});

describe('Integración MiniBlog API', () => {
    let createdAuthorId;
    let createdPostId;

    test('POST /authors - Debería crear un autor (201)', async () => {
        const res = await request(app)
            .post('/authors')
            .send({ name: 'Dev Tester', email: 'tester@devspark.io', bio: 'Testing API' });
        
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('id');
        createdAuthorId = res.body.id;
    });

    test('POST /authors - Debería fallar con email inválido (400)', async () => {
        const res = await request(app)
            .post('/authors')
            .send({ name: 'Dev Tester 2', email: 'sin-arroba' });
        
        expect(res.statusCode).toBe(400);
    });

    test('POST /posts - Debería crear un post (201)', async () => {
        const res = await request(app)
            .post('/posts')
            .send({ author_id: createdAuthorId, title: 'Mi primer test', content: 'Contenido del post test' });
        
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('id');
        createdPostId = res.body.id;
    });

    test('POST /comments - Debería crear un comentario extra credit (201)', async () => {
        const res = await request(app)
            .post('/comments')
            .send({ post_id: createdPostId, author_id: createdAuthorId, content: 'Comentario de prueba' });
        
        expect(res.statusCode).toBe(201);
    });

    test('DELETE /authors/:id - Borrado de autor con borrado en cascada de sus posts (204)', async () => {
        const res = await request(app).delete(`/authors/${createdAuthorId}`);
        expect(res.statusCode).toBe(204);

        // Verificar que el post del autor fue eliminado en cascada
        const postCheck = await request(app).get(`/posts/${createdPostId}`);
        expect(postCheck.statusCode).toBe(404);
    });
});