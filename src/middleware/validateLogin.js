module.exports = (req, res, next) => {
  const { email } = req.body;
  const regexEmail = /^[a-z0-9.]+@[a-z0-9]+.[a-z]+.([a-z]+)?$/i;
  if (!email) {
    res.status(400).send({ message: 'O campo "email" é obrigatório' });
  }
  if (!regexEmail.test(email)) {
    res.status(400).send({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  next();
};