import React from 'react';
import ReactDOM from 'react-dom';

import styles from './main.css';

ReactDOM.render((
  <div className={styles.reactParagraph}>
    <p>This is a paragraph generated via React.</p>
  </div>
), document.getElementById('root'));
