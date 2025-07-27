const { Pool } = require('pg');

exports.handler = async (event, context) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    const pool = new Pool({
        connectionString: process.env.DATABASE_URL,
    });

    try {
        const { gradeRates } = JSON.parse(event.body);
        await pool.query('INSERT INTO grade_rates (id, rates) VALUES (1, $1) ON CONFLICT (id) DO UPDATE SET rates = $1', [JSON.stringify(gradeRates)]);

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Stipendi per grado salvati con successo.' }),
        };
    } catch (error) {
        console.error('Errore nel salvare gli stipendi:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Errore interno del server' }),
        };
    } finally {
        await pool.end();
    }
};