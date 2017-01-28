import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';

import routes from '../client/routes';

import ErrorPage from '../client/modules/ErrorPage';
import NotFoundPage from '../client/modules/NotFoundPage';

export default (req, res) => {
  res.render('index');
};
