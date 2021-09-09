/* 
Require query
async function getAllScores
Write SQL statement to get all from scores
await response from query
return rows from response
*/

const { query } = require('../db');

async function getAllScores() {
  const sqlQuery = `SELECT id, name, EXTRACT(DAY FROM day)::TEXT || ' /
    ' || EXTRACT(MONTH FROM day)::TEXT ||' /
    ' || EXTRACT (YEAR FROM day)::TEXT as day, energiser, score FROM scores ORDER BY score DESC;`;

  const data = await query(sqlQuery);

  return data.rows;
}

async function getScoresByEnergiser(energiser) {
  const sqlQuery = `SELECT id, name, EXTRACT(DAY FROM day)::TEXT || ' /
    ' || EXTRACT(MONTH FROM day)::TEXT ||' /
    ' || EXTRACT (YEAR FROM day)::TEXT as day, score FROM scores WHERE energiser ILIKE $1 ORDER BY score DESC;`;

  const data = await query(sqlQuery, ['%' + energiser + '%']);

  return data.rows;
}

async function getScoresByPerson(name) {
  const sqlQuery = `SELECT id, name, EXTRACT(DAY FROM day)::TEXT || ' /
    ' || EXTRACT(MONTH FROM day)::TEXT ||' /
    ' || EXTRACT (YEAR FROM day)::TEXT as day, energiser, score FROM scores WHERE name ILIKE $1 ORDER BY score DESC;`;

  const data = await query(sqlQuery, ['%' + name + '%']);
  return data.rows;
}

async function createScore({ name, day, energiser, score }) {
  const sqlQuery =
    'INSERT INTO scores (name, day, energiser, score) VALUES ($1, $2, $3, $4) RETURNING *;';

  const data = await query(sqlQuery, [name, day, energiser, score]);
  return data.rows[0];
}

async function deleteScoreById({ id }) {
  const sqlQuery = 'DELETE FROM scores WHERE id = $1;';

  const _data = await query(sqlQuery, [id]);
  return `Score with id of ${id} deleted`;
}

async function updateScore(body) {
  console.log(body);
  const { id, name, score, day, energiser } = body;
  const sqlQuery =
    'UPDATE scores SET name = $1, score = $2, day = $3, energiser = $4 WHERE id = $5 RETURNING *';
  const { rows } = await query(sqlQuery, [name, score, day, energiser, id]);
  return rows;
}

async function patchScore(score) {
  const colNames = ['name', 'score', 'day', 'id', 'energiser'];
  const { id, column, value } = score;
  const columnValid = colNames.includes(column.toLowerCase());

  if (!columnValid) {
    throw new Error('Column does not exist in database');
  }
  const sqlQuery = `UPDATE scores SET ${column} = $1 WHERE id = $2 RETURNING *;`;
  const { rows } = await query(sqlQuery, [value, id]);
  return rows;
}

module.exports = {
  getAllScores,
  getScoresByEnergiser,
  getScoresByPerson,
  createScore,
  deleteScoreById,
  updateScore,
  patchScore,
};
