import { atom } from 'jotai';

export const clockAtom = atom({
  light: false,
  lastUpdate: 0,
});

export const productsList = atom([])
export const servicesList = atom([])