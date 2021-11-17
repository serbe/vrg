import type { ChangeEvent, FormEvent, KeyboardEvent } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/button';
import { FormField } from '../../components/formfield';
import { useSign } from '../../services/auth';
import { postLogin } from '../../services/fetcher';

const submitHandler = (event: FormEvent<HTMLFormElement>): void => {
  event.preventDefault();
};

export const Login = (): JSX.Element => {
  const navigate = useNavigate();
  const { signIn } = useSign();
  const [name, setName] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');

  const submit = (): void => {
    postLogin(name, pass)
      .then((response) => {
        signIn({ name, role: response.r, token: response.t });
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
            onChange={(event: ChangeEvent<HTMLInputElement>): void => {
              setName(event.target.value);
            }}
            type="text"
          />
          <FormField
            icon="key"
            label="Пароль"
            name="password"
            onChange={(event: ChangeEvent<HTMLInputElement>): void => {
              setPass(event.target.value);
            }}
            onKeyPress={(event: KeyboardEvent<HTMLInputElement>): void => {
              if (event.key === 'Enter') {
                submit();
              }
            }}
            type="password"
          />
          <div className="field">
            <div className="control">
              <Button
                onClick={(): void => {
                  submit();
                }}
              >
                Отправить
              </Button>
            </div>
          </div>
          <div>{error}</div>
        </div>
      </form>
    </div>
  );
};
