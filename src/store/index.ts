import { atom } from 'jotai';

export const clockAtom = atom({
  light: false,
  lastUpdate: Date.now(),
});


export const cartList = atom<any[]>([])
cartList.debugLabel = "cart list"