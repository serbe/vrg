import { User } from '../models/user';

export const setStorage = (user: User): void => {
  localStorage.setItem('user', JSON.stringify(user))
}

export const clearStorage = (): void => {
  localStorage.removeItem('user')
}

export const getStorage = (): User => {
  const userStorage: string | null = localStorage.getItem('user')
  const user: User = { role: 0, name: '', token: '' }
  if (userStorage) {
    const u: User | undefined = JSON.parse(userStorage)
    if (u) {
      user.name = u.name
      user.role = u.role
      user.token = u.token
    }
  }
  return user
}
