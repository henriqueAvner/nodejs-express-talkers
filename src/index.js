const express = require('express');
const fs = require('fs').promises;
const path = require('path');

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