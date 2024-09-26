import { CartListInterface } from '@/interfaces';
import { atom } from 'jotai';

export const clockAtom = atom({
  light: false,
  lastUpdate: Date.now(),
});




export const cartList = atom<CartListInterface>({items:[],totalPrice:0})
cartList.debugLabel = "cart list"