const bigquery = require('../bigquery')

const getCompras = async () => {
  const query = `
      #standardSQL
      select *
      from \`mulequinho.com:api-project-28259644992.meetup.view_RelatorioCompra\`
      `

  console.log('iniciar consulta')
  const queryResults = await bigquery.runQuery(query)
  console.log(queryResults)
  return queryResults
}

module.exports = { getCompras }
