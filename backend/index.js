const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.json({ response: 'Welcome to the API' });
});

app.post('/hello', (req, res) => {
  const { message } = req.body;
  res.json({ response: `hello ${message}` });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
