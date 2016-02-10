import style from './style'
import React, { PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import { connect } from 'react-redux'
import Axios from 'axios'
import { capitalize } from 'utils.rendering'
import { Y, X } from 'obj.Layout'

import TextField from 'material-ui/lib/text-field'
import Card from 'material-ui/lib/card/card'
import CardTitle from 'material-ui/lib/card/card-title'
import CardText from 'material-ui/lib/card/card-text'
import TouchRipple from 'material-ui/lib/ripples/touch-ripple'
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import RaisedButton from 'material-ui/lib/raised-button'

import { transitionTo } from 'App/state/routing/actions'
import { importUsers, addUser } from 'App/state/actions'


let UserTile = ({ name, redirect }) =>
  <Card styleName='user-tile'>
    <CardTitle title={name} />
      <div>
        <RaisedButton label='View Profile' fullWidth={true}
          onTouchTap={() => redirect(`/user/${name}`)}/>
      </div>
  </Card>

UserTile = CSSModules(UserTile, style)
const Users = React.createClass({

  getInitialState() {
    return { newUser: '' }
  },
  componentWillMount() {

  },
  handleChange(e) {
    this.setState({ newUser: e.target.value })
  },
  render() {
    return (
      <Y>
        <X>
          <TextField placeholder='Username...' onChange={this.handleChange}/>
          <RaisedButton label='Add User' onTouchTap={() => this.props.addUser(this.state.newUser)} />
        </X>
        <X wrap={true}>
          {this.props.users.map((user, i) =>
            <UserTile key={i} {...user} redirect={this.props.transitionTo} />
          )}
        </X>
      </Y>
    )
  }
})

Users.propTypes = {
  users: PropTypes.array
}

export default connect(
  ({users}) => ({users}),
  { transitionTo, importUsers, addUser }
)(CSSModules(Users, style))
