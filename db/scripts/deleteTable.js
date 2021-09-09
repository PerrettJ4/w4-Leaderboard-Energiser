const { query } = require('../index');

async function deleteTable() {
  const sqlQuery = 'DROP TABLE IF EXISTS scores';

  const _response = await query(sqlQuery);
  console.log('Score table deleted');
}

deleteTable();
