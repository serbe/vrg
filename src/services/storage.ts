import type { User } from '../models/types';

export const setStorage = (user: User): void => {
  localStorage.setItem('vrg-user', JSON.stringify(user));
};

export const clearStorage = (): void => {
  localStorage.removeItem('vrg-user');
};

export const getStorage = (): User => {
  const userStorage: string | null = localStorage.getItem('vrg-user');
  const user: User = { role: 0, name: '', token: '' };
  if (userStorage != null) {
    const u = JSON.parse(userStorage) as User | null;
    if (u) {
      user.name = u.name;
      user.role = u.role;
      user.token = u.token;
    }
  }
  return user;
};
