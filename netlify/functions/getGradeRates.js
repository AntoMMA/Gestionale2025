const { Pool } = require('pg');

exports.handler = async (event, context) => {
    const pool = new Pool({
        connectionString: process.env.DATABASE_URL,
    });

    try {
        const result = await pool.query('SELECT rates FROM grade_rates WHERE id = 1');
        const gradeRates = result.rows[0] ? result.rows[0].rates : {};
        return {
            statusCode: 200,
            body: JSON.stringify(gradeRates),
        };
    } catch (error) {
        console.error('Errore nel recupero degli stipendi per grado:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Errore interno del server' }),
        };
    } finally {
        await pool.end();
    }
};