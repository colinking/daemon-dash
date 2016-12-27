import express from 'express';
import path from 'path';

const app = express();

app.use(express.static(path.join(__dirname, '../dist')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.listen(3000, () => {
  console.log('Server listening on port 3000.');
});
