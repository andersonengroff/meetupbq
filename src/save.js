/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
const Service = require('../helpers/concurrentRequest')
const bigquery = require('../bigquery')

const { instance } = new Service()
let ltRequest = []

const getUrl = url => instance
  .get(url)
  .then((response) => {
    if (response.status === 200) {
      return response.data
    }
  })
  .catch((error) => {
    console.log(error)
    return {}
  })


const resolveRequest = async () => {
  const rstRequest = await Promise.all(ltRequest)

  const ltInsert = []
  rstRequest.map((list) => {
    list.data.map((values) => {
      ltInsert.push({ ...values })
    })
  })

  console.log(ltInsert)


  new Promise((resolve, reject) => {
    resolve(bigquery.insertRowsAsStream('meetup', 'Fornecedor', ltInsert))
    // eslint-disable-next-line prefer-promise-reject-errors
    reject('Erro ao gravar no bigquery')
  }).catch((error) => {
    console.log(error)
  })
}

const loaderFornecedores = async () => {
  ltRequest = []
  const url = 'http://localhost:3000/fornecedores'
  ltRequest.push(getUrl(url))

  resolveRequest()
}

module.exports = { loaderFornecedores }
