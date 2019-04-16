const fileCredentials = './credentials/credentials.json'
const { BigQuery } = require('@google-cloud/bigquery')

const initBQ = {
  projectId: 'mulequinho.com:api-project-28259644992',
  keyFilename: fileCredentials,
}

const bigquery = new BigQuery(initBQ)

async function runQuery(query) {
  const options = {
    query,
    useLegacySql: false,
  }

  // Runs the query as a job
  const [job] = await bigquery.createQueryJob(options)
  console.log(`Job ${job.id} started.`)


  // Waits for the query to finish
  const [rows] = await job.getQueryResults()

  return rows
}

async function insertRowsAsStream(datasetId, tableId, rows) {
  // Inserts data into a table
  await bigquery
    .dataset(datasetId)
    .table(tableId)
    .insert(rows)
  console.log(`Inserted ${rows.length} rows`)
}

const getCurrentDateTime = () => bigquery.datetime(new Date().toISOString())

module.exports = { runQuery, insertRowsAsStream, getCurrentDateTime }
