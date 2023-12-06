module.exports = (req, res, next) => {
  const { watchedAt } = req.body.talk;
  const trueDate = /^[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{4}$/;

  if (!watchedAt) {
    return res.status(400).json({
      message: 'O campo "watchedAt" é obrigatório',
    });
  }
  if (!trueDate.test(watchedAt)) {
    return res.status(400).json({
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }
  next();
};