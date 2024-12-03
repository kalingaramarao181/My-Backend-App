import mysql from 'mysql2/promise';

// Database connection configuration
const dbConfig = {
    host: process.env.DB_HOST,  
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
};

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            // Connect to the database
            const connection = await mysql.createConnection(dbConfig);

            // Query the database
            const [rows] = await connection.execute('SELECT * FROM userdata');

            // Close the connection
            await connection.end();

            // Send the data as JSON
            res.status(200).json(rows);
        } catch (error) {
            console.error('Database error:', error.message);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
