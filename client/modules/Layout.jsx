import React from 'react';

import styles from './Layout.scss';

export default function Layout(props) {
  return (
    <div className={styles.layout}>{props.children}</div>
  );
}

Layout.propTypes = {
  children: React.PropTypes.element.isRequired,
};
