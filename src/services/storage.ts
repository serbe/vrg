import { User } from '../models/types';

export const setStorage = (user: User): void => {
  localStorage.setItem('vrg-user', JSON.stringify(user));
};

export const clearStorage = (): void => {
  localStorage.removeItem('vrg-user');
};

export const getStorage = (): User => {
  const userStorage: string | null = localStorage.getItem('vrg-user');
  const user: User = { role: 0, name: '', token: '' };
  if (userStorage) {
    const u = JSON.parse(userStorage) as User | undefined;
    if (u) {
      user.name = u.name;
      user.role = u.role;
      user.token = u.token;
    }
  }
  return user;
};
