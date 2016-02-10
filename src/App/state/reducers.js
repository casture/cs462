import { createReducer } from 'utils.redux'

export const users = createReducer([], {
  ['IMPORT_USERS']: (state, action) => action.users,
  ['ADD_USER']: (state, { name }) => [
    ...state,
    { name }
  ]
})

export const user = createReducer({}, {
  ['SIGN_IN_SUCCESS']: (state, action) => {
    console.log(action)
    return state
  },
  ['SIGN_IN_FAILURE']: (state, action) => {
    console.log(action)
    return state
  },
  ['SIGN_OUT']: (state, action) => {}
})

export const session = createReducer({}, {
  ['SIGN_IN_SUCCESS']: (state, action) => {
    console.log(action)
    return state
  }
})
