/* 
Import query
Async function
Pass in SQL setting up the table and await response
Console.log when done
Call function
*/

const { query } = require('../index');

async function createTable() {
  const sqlQuery =
    'CREATE TABLE IF NOT EXISTS scores (id SERIAL PRIMARY KEY, name TEXT NOT NULL, day DATE, energiser TEXT NOT NULL, score INTEGER NOT NULL);';

  const _response = await query(sqlQuery);
  console.log('Score table created');
}

createTable();
