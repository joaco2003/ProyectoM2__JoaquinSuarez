const app = require('./app');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Servidor MiniBlog API ejecutándose en el puerto ${PORT}`);
    console.log(`📄 Documentación OpenAPI disponible en http://localhost:${PORT}/api-docs`);
});