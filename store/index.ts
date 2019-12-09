import { MutationTree, ActionTree } from 'vuex/types/index'
import { User } from '@/types/user'

/**
 * State.
 */
export const state = () => ({
  /**
   * Me user.
   */
  me: {
    name: '名無しのねこ',
    hash: ''
  } as User,

  /**
   * Socket server url.
   */
  socketURL: 'http://localhost'
})

/**
 * Root state type.
 */
export type RootState = ReturnType<typeof state>

/**
 * Mutations.
 */
export const mutations: MutationTree<RootState> = {
  /**
   * Set me.
   *
   * @param state
   * @param me
   */
  SET_ME(state, me: User) {
    state.me = me
  },
  /**
   * Set socket server url.
   *
   * @param state
   * @param url
   */
  SET_SOCKET_URL(state, url: string) {
    state.socketURL = url
  }
}

/**
 * Actions.
 */
export const actions: ActionTree<RootState, RootState> = {
  /**
   * Login.
   *
   * @param param0
   * @param me
   */
  login({ commit }, me: User) {
    commit('SET_ME', me)
  }
}
