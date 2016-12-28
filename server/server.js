import express from 'express';
import path from 'path';

const app = express();
const Console = console;

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, '../dist')));

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(app.get('port'), () => {
  Console.log('Server listening on port %d in %s mode.',
      app.get('port'), process.env.NODE_ENV);
});
