import { Module } from 'vuex'
import { IRootState } from '@/store/types'
import { ISystemState } from './types'

import { getPageListData } from '@/service/main/system/system'

const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      userList: [],
      userCount: 0,
      roleList: [],
      roleCount: 0
    }
  },
  getters: {
    pageListData(state) {
      return (pageName: string) => {
        switch (pageName) {
          case 'user':
            return state.userList
          case 'role':
            return state.roleList
        }
      }
    }
  },
  mutations: {
    changeUserList(state, userList: any[]) {
      state.userList = userList
    },
    changeUserCount(state, userCount: number) {
      state.userCount = userCount
    },
    changeRoleList(state, roleList: any[]) {
      state.roleList = roleList
    },
    changeRoleCount(state, roleCount: number) {
      state.roleCount = roleCount
    }
  },
  actions: {
    async getPageListAction({ commit }, payload: any) {
      // 获取pageUrl
      const pageName = payload.pageName
      let pageUrl = ''
      switch (pageName) {
        case 'user':
          pageUrl = '/users/list'
          break
        case 'role':
          pageUrl = '/role/list'
          break
      }

      // 对页面发送请求
      const pageResult = await getPageListData(pageUrl, payload.queryInfo)
      const { list, totalCount } = pageResult.data
      console.log(list)

      // 将数据存储到state中

      switch (pageName) {
        case 'user':
          commit(`changeUserList`, list)
          commit(`changeUserCount`, totalCount)
          break
        case 'role':
          commit(`changeRoleList`, list)
          commit(`changeRoleCount`, totalCount)
          break
      }
    }
  }
}

export default systemModule
