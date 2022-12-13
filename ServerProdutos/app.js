const express = require('express')
const mysql = require('mysql2')
const connect = require('./serverProdutos.js')
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.post('/produto/', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    return connect.execSQLQuery("insert into tb_produtos (image, nome, capacidade, preco) values('" + req.body.image + "','" + req.body.nome + "','" + req.body.capacidade + "','" + req.body.preco + "')", res);
})

app.put('/produto/:id', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    return connect.execSQLQuery("update tb_produtos set nome='" + req.body.nome + "', capacidade='" + req.body.capacidade + "', preco='" + req.body.preco + "' where id=" + req.params.id, res);
})

app.delete('/produto/:id', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    return connect.execSQLQuery("delete from tb_produtos where id=" + req.params.id, res);
})

app.get('/', (req, res) => {
    res.send('Executando servidor dos produtos')
    res.end()
})

app.get('/produto', (req, res) => {
    res.setHeader('Acess-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    return connect.execSQLQuery('select * from tb_produtos', res)
})


app.get('/produto/:id', (req, res) => {
    res.setHeader('Acess-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    return connect.execSQLQuery('select * from tb_produtos where id=' + req.params.id, res)
})

const PORT = process.env.PORT || 8000
app.listen(PORT, console.log(`Server started on port ${PORT}`))