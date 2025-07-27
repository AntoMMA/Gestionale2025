const { Pool } = require('pg');

exports.handler = async (event, context) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    const pool = new Pool({
        connectionString: process.env.DATABASE_URL,
    });

    try {
        const { id, grade } = JSON.parse(event.body);
        await pool.query('UPDATE employees SET grade = $1 WHERE id = $2', [grade, id]);

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Grado aggiornato con successo.' }),
        };
    } catch (error) {
        console.error('Errore nell\'aggiornare il grado:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Errore interno del server' }),
        };
    } finally {
        await pool.end();
    }
};