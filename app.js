const express = require('express')
const fornecedor = require('./src/fornecedor')
const loader = require('./src/save')
const compra = require('./src/compra')

const app = express()
const router = express.Router()


const index = router.get('/', (req, res) => {
  res.status(200).send({
    title: 'Node Express API',
    version: '0.0.1',
  })
})

const listfornecedor = router.get('/fornecedores', (req, res) => {
  const data = fornecedor.popularFornecedores()
  res.status(200).send({ data })
})

const saveToBigQuery = router.post('/save', (req, res) => {
  loader.loaderFornecedores()
  res.status(200).send({ msg: 'sucesso' })
})

const getCompras = router.get('/compras', (req, res) => {
  const data = compra.getCompras()
  res.status(200).send({ data })
})

app.use('/', index)
app.use('/fornecedores', listfornecedor)
app.use('/save', saveToBigQuery)
app.use('/compras', getCompras)
module.exports = app
