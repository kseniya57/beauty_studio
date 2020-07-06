import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { login, moduleName as authModule } from '@/store/ducks/auth';
import { Input, Button, Flex, Title } from '@/elements';

function AuthPage({ login }) {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  useEffect(() => {
    localStorage.removeItem('token');
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ email, password })
  }

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleSubmit(e);
    }
  }

  return (
    <Flex aic jcc className={'fullheight'}>
      <Flex aic jcc fdc as="form" onKeyDown={handleKeyDown}>
        <Title>Авторизация</Title>
        <Input
          placeholder="E-Mail"
          type="email"
          mb="2rem"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <Input
          placeholder="Пароль"
          type="password"
          mb="2rem"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <Button onClick={handleSubmit} color="black">
          ОК
        </Button>
      </Flex>
    </Flex>
  );
}

export default connect(
  state => ({
    loading: state[authModule].loading,
    error: state[authModule].error
  }),
  { login }
)(AuthPage);
