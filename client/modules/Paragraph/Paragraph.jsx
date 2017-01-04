import React from 'react';
import { Button } from 'semantic-ui-react'

import styles from './Paragraph.scss';

export default function Paragraph() {
  return (
    <div className={styles.reactParagraph}>
      <Button>This is a Semantic Ui Button.</Button>
      <p>This is a paragraph generated via React.</p>
    </div>
  );
}
