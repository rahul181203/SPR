import { atom } from 'jotai';

export const clockAtom = atom({
  light: false,
  lastUpdate: Date.now(),
});


export const productsList = atom<any[]>([])
productsList.debugLabel = "product list"
export const servicesList = atom<any[]>([])
servicesList.debugLabel = "services list"