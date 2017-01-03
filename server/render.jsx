import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';

import routes from '../client/routes';

import ErrorPage from '../client/modules/ErrorPage';
import NotFoundPage from '../client/modules/NotFoundPage';

export default (req, res) => {
  match({
    routes,
    location: req.url,
  }, (err, redirectLocation, renderProps) => {
    let markup;

    if (redirectLocation) {
      return res.redirect(302,
          redirectLocation.pathname + redirectLocation.search);
    }

    if (err) {
      console.log(err); // eslint-disable-line no-console
      res.status(500);
      markup = renderToString(<ErrorPage />);
    } else if (renderProps) {
      // Give 404 status code if we're supposed to render a 404 page.
      if (renderProps.components.indexOf(NotFoundPage) !== -1) {
        res.status(404);
      }
      markup = renderToString(<RouterContext {...renderProps} />);
    } else {
      res.status(404);
      markup = renderToString(<NotFoundPage />);
    }
    return res.render('index', { markup });
  });
};
