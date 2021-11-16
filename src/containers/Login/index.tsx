import { ChangeEvent, FormEvent, KeyboardEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/button';
import { FormField } from '../../components/formfield';
import { useSign } from '../../services/auth';
import { postLogin } from '../../services/fetcher';

const submitHandler = (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();
};

export const Login = () => {
  const navigate = useNavigate();
  const { signIn } = useSign();
  const [name, setName] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');

  const submit = (): void => {
    postLogin(name, pass)
      .then((response) => {
        signIn({ name, role: response.r, token: response.t });
        return navigate('/');
      })
      .catch(() => setError(`error`));
  };

  return (
    <div className="container w300">
      <form onSubmit={submitHandler}>
        <div className="box mt-4">
          <h3 className="title is-3">Авторизация</h3>
          <FormField
            name="name"
            type="text"
            icon="user"
            label="Имя пользователя"
            autocomplete="udds-password"
            onChange={(event: ChangeEvent<HTMLInputElement>): void => {
              setName(event.target.value);
            }}
          />
          <FormField
            name="password"
            type="password"
            icon="key"
            label="Пароль"
            onChange={(event: ChangeEvent<HTMLInputElement>): void => {
              setPass(event.target.value);
            }}
            onKeyPress={(event: KeyboardEvent<HTMLInputElement>): void => {
              if (event.key === 'Enter') {
                submit();
              }
            }}
          />
          <div className="field">
            <div className="control">
              <Button onClick={() => submit()}>Отправить</Button>
            </div>
          </div>
          <div>{error}</div>
        </div>
      </form>
    </div>
  );
};

export default Login;
