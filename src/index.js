const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const generateToken = require('./utils/generateToken');
const validateLogin = require('./middleware/validateLogin');
const validatePass = require('./middleware/validatePass');
const validadeToken = require('./utils/validadeToken');
const validateName = require('./middleware/validateName');
const validateAge = require('./middleware/validateAge');
const validateTalk = require('./middleware/validateTalk');
const validateRate = require('./middleware/validateRate');
const validateWatchedAt = require('./middleware/validateWatchedAt');
const validateHeaderRate = require('./middleware/validateHeaderRate');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

const talkerPath = path.resolve(__dirname, './talker.json');

async function readJson() {
  try {
    const contentFile = await fs.readFile(talkerPath);
    const talkerFile = JSON.parse(contentFile);
    return talkerFile;
  } catch (error) {
    console.error(`Arquivo não lido: ${error}`);
  }
}

app.get('/talker/', async (_req, res) => {
  try {
    res.status(200).json(await readJson());
  } catch (error) {
    res.status(200).send([]);
  }
});
app.get('/talker/search', validadeToken, async (req, res) => {
  const { q } = req.query;
  const allTalkers = await readJson();
  if (!q) {
    return res.status(200).json(allTalkers);
  }
  const filterTalkers = allTalkers.filter(({ name }) => name.includes(q));

  if (filterTalkers.length === 0) {
    return res.status(200).json([]);
  }

  return res.status(200).json(filterTalkers);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const allTalkers = await readJson();
  const currTalker = allTalkers.find((talker) => talker.id === +id);
  if (currTalker !== undefined) {
    res.status(200).json(currTalker);
  } else {
    res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
});

app.post('/login', validateLogin, validatePass, (_req, res) => {
  const token = generateToken();
  return res.status(200).json({ token });
});

app.post('/talker', validadeToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate, async (req, res) => {
    const currTalker = req.body;
    const allTalkers = await readJson();
    const newTalker = {
      id: allTalkers[allTalkers.length - 1].id + 1,
      ...currTalker,
    };
    const newAllTalkers = JSON.stringify([...allTalkers, newTalker]);
    await fs.writeFile(talkerPath, newAllTalkers);
    res.status(201).json(newTalker);
  });

app.put('/talker/:id', validadeToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
  async (req, res) => {
    const { id } = req.params;
    const { name, age, talk } = req.body;
    const allTalkers = await readJson();
    const updateTalker = allTalkers.find((talker) => talker.id === +id);
    if (!updateTalker) {
      return res.status(404).json({
        message: 'Pessoa palestrante não encontrada',
      });
    }
    updateTalker.name = name;
    updateTalker.age = age;
    updateTalker.talk = talk;
    const newTalker = JSON.stringify(allTalkers);
    await fs.writeFile(talkerPath, newTalker);
    return res.status(200).json(updateTalker);
  });

app.delete('/talker/:id', validadeToken, async (req, res) => {
  const { id } = req.params;
  const talkers = await readJson();
  const arrayPosition = talkers.findIndex((talker) => talker.id === +id);
  talkers.splice(arrayPosition, 1);
  const newTalker = JSON.stringify(talkers);
  await fs.writeFile(talkerPath, newTalker);
  return res.status(204).end();
});

app.get('/talker/search', validadeToken, validateHeaderRate, async (req, res) => {
  const { rate, q } = req.query;
  const allTalkers = await readJson();

  if (!q) {
    const rateFilter = allTalkers.filter(({ talk }) => talk.rate === +rate);
    return res.status(200).json(rateFilter);
  }
  const filterRateAndName = allTalkers.filter(({ name }) => name.includes(q))
    .filter(({ talk }) => talk.rate === +rate);

  return res.status(200).json(filterRateAndName);

})