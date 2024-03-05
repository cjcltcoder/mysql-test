const express = require('express');
const mysql = require('mysql');

const port = process.env.port || 3000;
const app = express();

var connection = mysql.createConnection({
    host : 'sql5.freemysqlhosting.net',
    user : 'sql5688763',
    password : 'KyRAYdGCId',
    database : 'sql5688763'
});

app.get('/api/signup', async (req, res) => {
    const { username, password } = res.body;
    const pwd = encryptPassword(password);
    const date = transformDate(new Date());

    connection.query('INSERT INTO user VALUES ("", ?, ?, date)', [username, password, date], function (error, results, fields) {
        connection.end();
        if (error) throw error;
        res.json(results);
    });
    
})

app.get('/', async (req, res) => {
    connection.connect();

    connection.query('SELECT * FROM budget', function (error, results, fields) {
        connection.end();
        if (error) throw error;
        res.json(results);
    });

})

app.listen(port, () => {
    console.log(`Server on port ${port}`)
});