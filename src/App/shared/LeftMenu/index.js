import React from 'react'
import { connect } from 'react-redux'
import Axios from 'axios'

import LeftNav from 'material-ui/lib/left-nav'
import MenuItem from 'material-ui/lib/menus/menu-item'
import PersonAdd from 'material-ui/lib/svg-icons/social/person-add';
import List from 'material-ui/lib/svg-icons/action/list';
import Settings from 'material-ui/lib/svg-icons/action/settings';
import Donut from 'material-ui/lib/svg-icons/action/donut-large';
import RaisedButton from 'material-ui/lib/raised-button'
import AppBar from 'material-ui/lib/app-bar'
import FlatButton from 'material-ui/lib/flat-button'

import { transitionTo } from 'App/state/routing/actions'
import { signIn, signOut } from 'App/state/actions'

const LeftMenu = React.createClass({
  getInitialState() {
    return { open: false }
  },

  signIn() {
    Axios.get('/auth', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Headers': 'content-type, Content-Length, Authorization, Origin, Accept',
        'Access-Control-Allow-Credentials': true,
      }
    })
      .then((data)=>console.log(data))
  },

  toggleLeftMenu(isOpen) {
    this.setState({ open: isOpen || !this.state.open })
  },

  render() {
    return (
      <div>
        <AppBar title='FourSquare'
          onLeftIconButtonTouchTap={() => this.toggleLeftMenu(true)}
          iconElementRight={(!this.props.user)
          ? <FlatButton label={"Sign In"} onTouchTap={this.signIn} />
          : <FlatButton label={"Sign Out"} onTouchTap={this.props.signOut} /> }
          />
        <LeftNav docked={false} open={this.state.open}
          onRequestChange={isOpen => this.toggleLeftMenu(false)}>
          <MenuItem primaryText='Users' leftIcon={<PersonAdd />}
            onTouchTap={() => {
              this.toggleLeftMenu(false)
              this.props.transitionTo('/')
            }} />
          {this.props.user
            ? <MenuItem primaryText='Sign Out' leftIcon={<PersonAdd />}
                onTouchTap={() => {
                  this.toggleLeftMenu(false)
                  this.props.signOutUser()
                }} />
            : ''}
        </LeftNav>
      </div>
    )
  }
})

export default connect(
  ({user}) => ({user: user.name ? user : null}),
  { transitionTo, signOut }
)(LeftMenu)
