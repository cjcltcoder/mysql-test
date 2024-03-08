const express = require('express');
const mysql = require('mysql');
const { encryptPassword, transformDate } = require('./utils');

const port = process.env.PORT || 3000;
const app = express();

const connection = mysql.createConnection({
    host: 'sql5.freemysqlhosting.net',
    user: 'sql5688763',
    password: 'KyRAYdGCId',
    database: 'sql5688763'
});

app.use(express.json());

// Route handler for user signup
app.post('/api/signup', async (req, res) => {
    const { username, password } = req.body;

    try {
        const hashedPassword = await encryptPassword(password);
        const date = transformDate(new Date());

        connection.query('INSERT INTO user (username, password, signedup) VALUES (?, ?, ?)', [username, hashedPassword, date], function (error, results, fields) {
            if (error) {
                console.error('Database error:', error);
                res.status(500).json({ error: 'User registration failed' });
                return;
            }

            res.json({ message: 'User registration successful', userID: results.insertId });
        });
    } catch (error) {
        console.error('Error encrypting password:', error);
        res.status(500).json({ error: 'User registration failed' });
    }
});

// Route handler for retrieving data
app.get('/', async (req, res) => {
    connection.query('SELECT * FROM budget', function (error, results, fields) {
        if (error) {
            console.error('Database error:', error);
            res.status(500).json({ error: 'Failed to fetch data' });
            return;
        }

        res.json(results);
    });
});

app.get('/api/users', async (req, res) => {
    connection.query('SELECT * FROM user', function (error, results, fields) {
        if (error) {
            console.error('Database error:', error);
            res.status(500).json({ error: 'Failed to fetch data' });
            return;
        }

        res.json(results);
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
