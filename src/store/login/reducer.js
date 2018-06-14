import { LOGIN, LOGIN_SUCCEED, LOGIN_FAILED, LOGOUT } from './action'

export default (
  state = {
    token: JSON.parse(localStorage.getItem('token')) || null,
    logining: false,
    logout: false,
    netLoading: {},
  },
  action
) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        token: null,
        logining: true,
        logout: false,
      }
    case LOGIN_SUCCEED:
      return {
        ...state,
        logining: false,
        logout: false,
        token: action.token,
      }
    case LOGIN_FAILED:
      return {
        ...state,
        logining: false,
        logout: false,
        error: action.error,
      }
    case LOGOUT:
      return {
        ...state,
        token: null,
        logining: false,
        logout: true,
      }
    default:
      return state
  }
}
