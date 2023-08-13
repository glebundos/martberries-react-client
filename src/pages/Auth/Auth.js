import s from './Auth.module.scss';
import { useState, useRef } from 'react';

function Auth() {
  const [login, setLogin] = useState(null);
  const [password, setPassword] = useState(null);
  const [activeUser, setActiveUser] = useState(
    localStorage.getItem('username')
  );

  const refLogin = useRef(null);
  const refPassword = useRef(null);

  const onLogin = async () => {
    let requestOptions = {
      method: 'POST',
      body: JSON.stringify({ username: login, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    let res = await fetch(
      'https://localhost:7134/api/user/authenticate',
      requestOptions
    );
    if (res.ok) {
      let result = await res.json();
      saveResult(result);
      refLogin.current.value = '';
      refPassword.current.value = '';
    } else {
      console.log('NOT OK');
    }
  };

  const saveResult = (result) => {
    localStorage.setItem('token', result.token);
    localStorage.setItem('username', result.username);
    localStorage.setItem('roleId', result.userRoleId);
    setActiveUser(result.username);
  };

  const getUsers = async () => {
    let token = localStorage.getItem('token');
    let requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };
    let res = await fetch('https://localhost:7134/api/user', requestOptions);
    let result = await res.json();
    console.log(result);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('roleId');
    setActiveUser(null);
  };

  return (
    <div className={s.app}>
      <div className={s.app__header}>
        {activeUser == null ? 'Login' : `Active user: ${activeUser}`}
      </div>
      <div className={s.app__content}>
        <input
          className={`${s.input} ${s.input__login}`}
          placeholder="Login"
          onChange={(e) => setLogin(e.target.value)}
          ref={refLogin}
        ></input>
        <input
          className={`${s.input} ${s.input__password}`}
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          ref={refPassword}
        ></input>
        <button
          className={`${s.button} ${s.confirm}`}
          onClick={() => onLogin()}
        >
          Sign in
        </button>
        <button
          className={`${s.button} ${s.confirm}`}
          onClick={() => getUsers()}
        >
          Get users
        </button>
        <button className={`${s.button} ${s.reject}`} onClick={() => logout()}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Auth;
