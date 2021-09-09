const { query } = require('../index');
const roundLeaderboard = require('../../data');

async function populateTable() {
  const sqlQuery =
    'INSERT INTO scores (name, day, energiser, score) VALUES ($1, $2, $3, $4) RETURNING *;';

  for (let person of roundLeaderboard) {
    const response = await query(sqlQuery, [
      person.name,
      person.date,
      person.energiser,
      person.score,
    ]);

    console.log(`${response.rows[0].name} inserted into table.`);
  }

  console.log('Scores table populated.');
}

populateTable();
