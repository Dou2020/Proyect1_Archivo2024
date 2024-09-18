const { Client } = require('pg')

const connectionData = {
    user: 'postgres',
    host: 'localhost',
    database: 'web_shop',
    password: '1234',
    port: 5432,
  }

module.exports = {
  connect(){
    const client = new Client(connectionData)
    client.connect()
    return client
  }
}