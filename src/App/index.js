import './style'
import React, { PropTypes } from 'react'

import LeftMenu from 'App/shared/LeftMenu'
import AppBar from 'material-ui/lib/app-bar'

const App = ({children}) => (
  <div>
    <LeftMenu />
    { children }
  </div>
)

App.propTypes = {
  children: PropTypes.node
}

export default App
