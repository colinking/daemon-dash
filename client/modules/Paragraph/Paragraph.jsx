import React from 'react';

import styles from './Paragraph.scss';

export default function Paragraph() {
  return (
    <div className={styles.reactParagraph}>
      <p>This is a paragraph generated via React.</p>
    </div>
  );
}
