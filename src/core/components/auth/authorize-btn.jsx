import React from "react"
import PropTypes from "prop-types"

export default class AuthorizeBtn extends React.Component {
  static propTypes = {
    onClick: PropTypes.func,
    isAuthorized: PropTypes.bool,
    showPopup: PropTypes.bool,
    getComponent: PropTypes.func.isRequired,
    modalOnly: PropTypes.bool
  }

  render() {
    let { isAuthorized, showPopup, onClick, getComponent, modalOnly } = this.props

    //must be moved out of button component
    const AuthorizationPopup = getComponent("authorizationPopup", true)

    return (
      <div className="auth-wrapper">
        { !modalOnly && (<button className={isAuthorized ? "btn authorize locked" : "btn authorize unlocked"} onClick={onClick}>
          <span>Authorize</span>
          <svg width="20" height="20">
            <use href={ isAuthorized ? "#locked" : "#unlocked" } xlinkHref={ isAuthorized ? "#locked" : "#unlocked" } />
          </svg>
        </button>)}
      { showPopup && <AuthorizationPopup /> }
      </div>
    )
  }
}
