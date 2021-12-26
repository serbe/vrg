import type { FormEvent, KeyboardEvent } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/button';
import { FormField } from '../../components/formfield';
import { postLogin, useSign } from '../../services/auth';
import { useString } from '../../services/hooks';

const submitHandler = (event: FormEvent<HTMLFormElement>): void => {
  event.preventDefault();
};

export const Login = (): JSX.Element => {
  const navigate = useNavigate();
  const { signIn } = useSign();
  const [name, setName, nameInput] = useString('');
  const [pass, setPass, passInput] = useString('');
  const [error, setError] = useState('');

  const submit = (): void => {
    postLogin(name, pass)
      .then((loginResponse) => {
        signIn({ name, role: loginResponse.r, token: loginResponse.t });
        navigate('/');
      })
      .catch(() => {
        setError(`error`);
      });
  };

  return (
    <div className="container w300">
      <form onSubmit={submitHandler}>
        <div className="box mt-4">
          <h3 className="title is-3">Авторизация</h3>
          <FormField
            autocomplete="udds-password"
            icon="user"
            label="Имя пользователя"
            name="name"
            type="text"
            value={name}
            onChange={nameInput}
            onClear={setName}
          />
          <FormField
            icon="key"
            label="Пароль"
            name="password"
            type="password"
            value={pass}
            onChange={passInput}
            onClear={setPass}
            onKeyPress={(event: KeyboardEvent<HTMLInputElement>): void => {
              if (event.key === 'Enter') {
                submit();
              }
            }}
          />
          <div className="field">
            <div className="control">
              <Button onClick={submit}>Отправить</Button>
            </div>
          </div>
          <div>{error}</div>
        </div>
      </form>
    </div>
  );
};

export default Login;
