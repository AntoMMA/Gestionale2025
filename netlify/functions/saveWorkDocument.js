const { Pool } = require('pg');

exports.handler = async (event, context) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    const pool = new Pool({
        connectionString: process.env.DATABASE_URL,
    });

    try {
        const { content } = JSON.parse(event.body);
        await pool.query('INSERT INTO work_document (id, content) VALUES (1, $1) ON CONFLICT (id) DO UPDATE SET content = $1', [content]);

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Documento salvato con successo.' }),
        };
    } catch (error) {
        console.error('Errore nel salvare il documento:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Errore interno del server' }),
        };
    } finally {
        await pool.end();
    }
};