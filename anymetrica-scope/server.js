require('dotenv').config();
const express = require('express');
const compression = require('compression');
const path = require('path');

const app = express();

app.use(compression());

app.use('/static', express.static(process.env.ABSOLUTE_STATIC_PATH));

app.get('/', (req, res) => {
  res.sendFile(path.join(process.env.ABSOLUTE_STATIC_PATH, '../index.html'));
});

const PORT = process.env.PORT || 3002;

app.listen(PORT, '0.0.0.0', (err) => {
  if (err) { console.log(err); }
  console.info(`==> 🌎 app listening on http://localhost:${PORT}.`);
});
