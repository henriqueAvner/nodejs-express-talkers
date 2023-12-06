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