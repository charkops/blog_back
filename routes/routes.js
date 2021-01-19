

module.exports = (app) => {
  app.get('/users', (req, res) => {
    res.status(200).send({
      message: 'Hello ?'
    });
  });

  app.post('/users/authenticate', (req, res) => {
    res.status(404).send({
      message: 'You done goofed'
    });
  });
};