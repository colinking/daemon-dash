import express from 'express';
import path from 'path';

import render from './render';

const app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, '../dist')));

app.get('*', render);

app.listen(app.get('port'), () => {
  // eslint-disable-next-line no-console
  console.log('Server listening on port %d in %s mode.',
      app.get('port'), process.env.NODE_ENV);
});
