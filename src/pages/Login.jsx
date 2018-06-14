import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import * as action from 'store/login/type'

class Login extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        登录
        <form>
          <button onClick={this.props.onSubmit}>登录</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  themeColor: state.themeColor,
})
const mapDispatchToProps = dispatch => ({
  onSubmit: token => {
    dispatch({ type: action.LOGIN, token })
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
