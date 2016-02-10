import { configureApiMiddleware } from 'redux-axios-api-middleware'
import { CALL_API } from 'App/state/actions'

let apiRoot = 'https://localhost/'

export const API_ROOT = apiRoot

const addToken = (getState, config) => {
  const { session } = getState()
  let headers = {}
  console.log(getState, config)

  if (session.token && config.url.match(API_ROOT)) {
    headers = { Authorization: `Bearer ${session.token}` }
  }

  return {
    ...config,
    headers: { ...headers, ...config.headers }
  }
}

export default configureApiMiddleware(CALL_API, API_ROOT, { requests: [addToken] })
// export default configureApiMiddleware(CALL_API, API_ROOT)
