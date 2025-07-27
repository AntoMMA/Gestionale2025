const { Pool } = require('pg');

exports.handler = async (event, context) => {
    const pool = new Pool({
        connectionString: process.env.DATABASE_URL,
    });

    try {
        const result = await pool.query('SELECT content FROM work_document WHERE id = 1');
        const content = result.rows[0] ? result.rows[0] : null;
        return {
            statusCode: 200,
            body: JSON.stringify(content),
        };
    } catch (error) {
        console.error('Errore nel recupero del documento:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Errore interno del server' }),
        };
    } finally {
        await pool.end();
    }
};