const express = require('express')
const mysql = require('mysql2')
const connect = require('./serverUser.js')
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.post('/user/', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    return connect.execSQLQuery("insert into tb_usuarios (nome,email,senha) values('" + req.body.nome + "','" + req.body.email + "','" + req.body.senha + "')", res);
})

app.put('/user/:id', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    return connect.execSQLQuery("update tb_usuarios set nome='" + req.body.nome + "', email='" + req.body.email + "',senha='" + req.body.senha + "' where id=" + req.params.id, res);
})

app.delete('/user/:id', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    return connect.execSQLQuery("delete from tb_usuarios where id=" + req.params.id, res);
})

app.get('/', (req, res) => {
    res.send('Executando servidor dos usuários')
    res.end()
})

app.get('/user', (req, res) => {
    res.setHeader('Acess-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    return connect.execSQLQuery('select * from tb_usuarios', res)
})

app.get('/user/:id', (req, res) => {
    res.setHeader('Acess-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    return connect.execSQLQuery('select * from tb_usuarios where id=' + req.params.id, res)
})

const PORT = process.env.PORT || 8001
app.listen(PORT, console.log(`Server started on port ${PORT}`))