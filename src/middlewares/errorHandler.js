const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    // Error de email duplicado (Unique violation en PostgreSQL)
    if (err.code === '23505') {
        return res.status(400).json({ error: 'El email ingresado ya está registrado.' });
    }

    // Violación de Clave Foránea (ej. author_id o post_id no existen)
    if (err.code === '23503') {
        return res.status(404).json({ error: 'La entidad referenciada (autor o post) no existe en la base de datos.' });
    }

    res.status(500).json({
        error: 'Error interno del servidor.',
        message: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
};

module.exports = errorHandler;