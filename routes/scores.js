const { Router } = require('express');
const router = new Router();

const {
  getAllScores,
  getScoresByEnergiser,
  getScoresByPerson,
  createScore,
  deleteScoreById,
  updateScore,
  patchScore,
} = require('../models/scores');

router.get('/', async (req, res) => {
  const { energiser, name } = req.query;
  try {
    if (energiser) {
      const data = await getScoresByEnergiser(energiser);
      res.json({
        success: true,
        message: `GET scores for ${energiser}`,
        payload: data,
      });
      return;
    }

    if (name) {
      const data = await getScoresByPerson(name);
      res.json({
        success: true,
        message: `GET scores for ${name}`,
        payload: data,
      });
      return;
    }

    const data = await getAllScores();
    res.json({
      success: true,
      message: 'GET all scores',
      payload: data,
    });
  } catch (err) {
    res.json({
      success: false,
      message: 'GET request failed',
      payload: err.message,
    });
  }
});

router.post('/', async (req, res) => {
  const { body } = req;
  try {
    const data = await createScore(body);
    console.log(data);
    res.json({
      success: true,
      message: 'Score added',
      payload: data,
    });
  } catch (err) {
    res.json({
      success: false,
      message: 'POST request failed',
      payload: err.message,
    });
  }
});

router.delete('/', async (req, res) => {
  const { body } = req;
  try {
    const data = await deleteScoreById(body);
    res.json({
      success: true,
      message: data,
    });
  } catch (err) {
    res.json({
      success: false,
      message: 'DELETE request failed',
      payload: err.message,
    });
  }
});

router.put('/', async (req, res) => {
  const { body } = req;
  try {
    const data = await updateScore(body);
    res.json({
      success: true,
      message: `Score with id ${data[0].id} updated`,
      payload: data,
    });
  } catch (err) {
    res.json({
      success: false,
      message: 'PUT request failed' + err.message,
    });
  }
});

router.patch('/', async (req, res) => {
  const { body } = req;
  try {
    const data = await patchScore(body);
    res.json({
      success: true,
      message: `Score with id ${data[0].id} patched`,
      payload: data,
    });
  } catch (err) {
    res.json({
      success: false,
      message: 'PATCH request failed:' + err.message,
    });
  }
});

module.exports = router;
