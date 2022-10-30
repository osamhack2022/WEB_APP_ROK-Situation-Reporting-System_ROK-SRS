import { atom } from 'recoil'

export const userState = atom({
  key: 'userState',
  default: {
    is_activated: false,
  },
})
