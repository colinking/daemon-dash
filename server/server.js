import express from 'express';
import path from 'path';

const app = express();
const Console = console;

app.use(express.static(path.join(__dirname, '../dist')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(3000, () => {
  Console.log('Server listening on port 3000.');
});
