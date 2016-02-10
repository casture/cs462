import { createAsyncActions as aa } from 'utils.redux'

export const CALL_API = 'CALL_API'
export const callApi = (config) => ({ [CALL_API]: config })


export const viewProfile = name => ({
  type: 'VIEW_PROFILE',
  name
})

export const importUsers = (users) => ({
  type: 'IMPORT_USERS',
  users
})

export const addUser = (name) => ({
  type: 'ADD_USER',
  name
})

export const SIGN_IN_ACTION_TYPES = aa('SIGN_IN')
export const signIn =
  () => {
    return callApi({
    method: 'GET',
    types: SIGN_IN_ACTION_TYPES,
    endpoint: 'auth'
  })}
export const SIGN_OUT_ACTION_TYPES = aa('SIGN_OUT')
export const signOut =
  () => callApi({
    method: 'GET',
    types: SIGN_OUT_ACTION_TYPES,
    endpoint: 'auth/signOut'
  })
