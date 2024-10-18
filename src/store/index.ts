import { CartListInterface } from '@/interfaces';
import { atom } from 'jotai';

export const clockAtom = atom({
  light: false,
  lastUpdate: Date.now(),
});

export const userID = atom<string>("")
userID.debugLabel = "user id"

export const cartList = atom<CartListInterface>({items:[],totalPrice:0})
cartList.debugLabel = "cart list"