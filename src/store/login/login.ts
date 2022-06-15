import { Module } from 'vuex'
import { ILoginState } from './types'
import { IRootState } from '../types'

const longinModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {}
    }
  },
  actions: {
    accountLoginAction({ commit }, payload: any) {
      console.log('action', payload)
    }
  }
}

export default longinModule
