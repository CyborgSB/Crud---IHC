const express = require('express');
const mysql = require('mysql');

const routes = express.Router();

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'barak@mk11',
    database: 'db_agenda_contato'
});

connection.connect((err) => {
    if (err)
        throw err.sqlMessage;
    console.log('Conectado ao Banco de Dados MySQL');
});

routes.get('/agendadigital', (req, res) => {
    connection.query('select id, nome, telefone, email from tb_contato ORDER BY nome ASC', (err, rows, fields) => {
        if (!err)
            res.status(200).json(rows);
        //res.send(JSON.stringify(rows));
        else
            res.status(400).json(rows);
    })
});

routes.get('/agendadigital/:id', (req, res) => {
    connection.query('select id, nome, telefone, email from tb_contato where id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.status(200).json(rows);
        else
            res.status(400).json(rows);
    })
});

routes.post("/agendadigital", function (req, res) {
    connection.query('insert tb_contato set ?', req.body, function (err, rows, fields) {
        if (!err)
            res.status(200).json(rows);
        else
            res.status(400).json(err);
    })
});

routes.put("/agendadigital/:id", function (req, res) {
    connection.query('update tb_contato set ? where id = ?', [req.body, req.params.id], function (err, rows, fields) {
        if (!err)
            res.status(200).json(rows);
        else
            res.status(400).json(err);
    })
});

routes.delete("/agendadigital/:id", function (req, res) {
    connection.query('delete from tb_contato where id = ?', [req.params.id], function (err, rows, fields) {
        if (!err)
            res.status(200).json(rows);
        else
            res.status(400).json(err);
    })
});

module.exports = routes;