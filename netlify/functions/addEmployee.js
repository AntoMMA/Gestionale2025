const { Pool } = require('pg');

exports.handler = async (event, context) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    const pool = new Pool({
        connectionString: process.env.DATABASE_URL,
    });

    try {
        const { grade, name, dob, hireDate, patenteImage, idImage, lavorativoImage } = JSON.parse(event.body);

        await pool.query(
            `INSERT INTO employees (grade, name, dob, hire_date, patente_image, id_image, lavorativo_image) 
             VALUES ($1, $2, $3, $4, $5, $6, $7)`,
            [grade, name, dob, hireDate, patenteImage, idImage, lavorativoImage]
        );

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Dipendente assunto con successo.' }),
        };
    } catch (error) {
        console.error('Errore nell\'aggiungere il dipendente:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Errore interno del server' }),
        };
    } finally {
        await pool.end();
    }
};