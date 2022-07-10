import { Module } from 'vuex'
import { IRootState } from '@/store/types'
import { ISystemState } from './types'

import { getPageListData } from '@/service/main/system/system'

const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      usersList: [],
      usersCount: 0,
      roleList: [],
      roleCount: 0
    }
  },
  getters: {
    pageListData(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}List`]
        /* switch (pageName) {
          case 'users':
            return state.usersList
          case 'role':
            return state.roleList
        } */
      }
    },
    pageListCount(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}Count`]
      }
    }
  },
  mutations: {
    changeUsersList(state, userList: any[]) {
      state.usersList = userList
    },
    changeUsersCount(state, userCount: number) {
      state.usersCount = userCount
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
      const pageUrl = `/${pageName}/list`
      /* switch (pageName) {
        case 'users':
          pageUrl = '/users/list'
          break
        case 'role':
          pageUrl = '/role/list'
          break
      } */

      // 对页面发送请求
      const pageResult = await getPageListData(pageUrl, payload.queryInfo)

      // 将数据存储到state中
      const { list, totalCount } = pageResult.data
      console.log(list)

      const chaangePageName =
        pageName.slice(0, 1).toUpperCase() + pageName.slice(1)

      commit(`change${chaangePageName}List`, list)
      commit(`change${chaangePageName}Count`, totalCount)

      /* switch (pageName) {
        case 'users':
          commit(`changeUserList`, list)
          commit(`changeUserCount`, totalCount)
          break
        case 'role':
          commit(`changeRoleList`, list)
          commit(`changeRoleCount`, totalCount)
          break
      } */
    }
  }
}

export default systemModule
