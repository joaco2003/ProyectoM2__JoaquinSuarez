INSERT INTO authors (name, email, bio) VALUES
('joaquin Suarez', 'joaquin.suarez@devspark.io', 'Desarrollador de software.'),
('Carlos Pérez', 'carlos.perez@devspark.io', 'Entusiasta del open source y escritor técnico.');

INSERT INTO posts (author_id, title, content, published) VALUES
(1, 'Introducción a Node.js y Express', 'En este post exploramos los conceptos básicos de Node.js...', TRUE),
(1, 'Arquitectura Limpia en Backend', 'Cómo organizar servicios y controladores en Express...', FALSE),
(2, 'Por qué elegir PostgreSQL', 'PostgreSQL ofrece robustez e integridad relacional...', TRUE);

INSERT INTO comments (post_id, author_id, content) VALUES
(1, 2, '¡Muy buen post Joaco! Clarísimo todo.'),
(3, 1, 'Totalmente de acuerdo, las FK en SQL evitan muchos dolores de cabeza.');