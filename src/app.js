const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./Configuracion/swagger.json');
const errorHandler = require('./middlewares/errorHandler');

const authorRoutes = require('./routes/authorRoute');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoute');

const app = express();

app.use(express.json());

// Documentación OpenAPI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Endpoints REST
app.use('/authors', authorRoutes);
app.use('/posts', postRoutes);
app.use('/comments', commentRoutes);

// Healthcheck endpoint
app.get('/health', (req, res) => res.status(200).json({ status: 'OK' }));

// Middleware centralizado de errores
app.use(errorHandler);

module.exports = app;