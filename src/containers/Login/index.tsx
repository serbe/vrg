import { ChangeEvent, FormEvent, KeyboardEvent, useState } from 'react';
import { useHistory } from 'react-router';
import { postLogin } from '~/services/fetcher';

import { useSign } from '../../services/auth';

export const Login = () => {
  const history = useHistory()
  const { signIn } = useSign()
  const [name, setName] = useState('')
  const [pass, setPass] = useState('')

  const submit = (): void => {
    postLogin(name, pass).then(response => {
      signIn({ name: name, role: response.r, token: response.t })
      history.push('/')
    })
  }

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  return (
    <div className="flex mt-16">
      <div className="h-40 w-64 m-auto">
        <p className="text-lg font-bold mb-6">Авторизация</p>
        <form onSubmit={submitHandler} className="space-y-4 text-gray-700">
          <div className="flex flex-wrap">
            <div className="w-full">
              <label className="block mb-1 font-bold" htmlFor="form_name">
                Имя пользователя
              </label>
              <div className="relative text-gray-700">
                <input
                  type="text"
                  placeholder="Имя пользователя"
                  className="w-full h-10 pl-10 pr-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
                  id="form_name"
                  onChange={(event: ChangeEvent<HTMLInputElement>): void => {
                    setName(event.target.value)
                  }}
                />
                <div className="absolute inset-y-0 left-0 flex items-center px-2 pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap">
            <div className="w-full">
              <label className="block mb-1 font-bold" htmlFor="form_pass">
                Пароль
              </label>
              <div className="relative text-gray-700">
                <input
                  type="password"
                  placeholder="Пароль"
                  className="w-full h-10 pl-10 pr-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
                  id="form_pass"
                  onChange={(event: ChangeEvent<HTMLInputElement>): void => {
                    setPass(event.target.value)
                  }}
                  onKeyPress={(event: KeyboardEvent<HTMLInputElement>): void => {
                    if (event.key === 'Enter') {
                      submit()
                    }
                  }}
                />
                <div className="absolute inset-y-0 left-0 flex items-center px-2 pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <button
            className="h-10 px-5 m-2 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800"
            onClick={() => submit()}
          >
            Войти
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
