export const LOGIN = 'LOGIN'
export const LOGIN_SUCCEED = 'LOGIN_SUCCEED'
export const LOGIN_FAILED = 'LOGIN_FAILED'
export const LOGOUT = 'LOGOUT'

export function login(data) {
  return {
    type: LOGIN,
    data,
  }
}

export function loginSucceed(token) {
  localStorage.setItem('token', JSON.stringify(token))
  return {
    type: LOGIN_SUCCEED,
    token,
  }
}

export function loginFailed(error) {
  return {
    type: LOGIN_FAILED,
    error,
  }
}

export function logout() {
  localStorage.removeItem('token')
  return {
    type: LOGOUT,
  }
}
