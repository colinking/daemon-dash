import React from 'react';
import { Input, Button } from 'semantic-ui-react';

import styles from './LoginPage.scss';

export default function LoginPage() {
  return (
    <form action="/api/login" method="post">
      <div className={styles.loginPanelParent}>
        <div className={styles.loginPanel}>
          <Input
            className={styles.input} fluid icon="mail"
            iconPosition="left" placeholder="Email address"
          />
          <Input
            className={styles.input}
            fluid icon="lock" iconPosition="left" placeholder="Password"
          />
          <Button fluid>Sign in</Button>
        </div>
      </div>
    </form>
  );
}
