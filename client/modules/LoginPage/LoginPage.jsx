import React from 'react';
import { Button } from 'semantic-ui-react';

import styles from './LoginPage.scss';

export default function Paragraph() {
  return (
    <div className={styles.reactParagraph}>
      <Button>This is a Semantic Ui Button.</Button>
      <p>Login Test.</p>
    </div>
  );
}
