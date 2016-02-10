import React from 'react'
import { connect } from 'react-redux'

const User = ({ user, params }) =>
  <div>
    <h1>{params.name}</h1>
  </div>

export default connect(
  ({user}) => ({user})
)(User)
