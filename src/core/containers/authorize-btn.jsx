import React from "react"
import PropTypes from "prop-types"

export default class AuthorizeBtnContainer extends React.Component {

  static propTypes = {
    specActions: PropTypes.object.isRequired,
    specSelectors: PropTypes.object.isRequired,
    authActions: PropTypes.object.isRequired,
    authSelectors: PropTypes.object.isRequired,
    getComponent: PropTypes.func.isRequired,
    modalOnly: PropTypes.bool
  }

  render () {
    const { authActions, authSelectors, specSelectors, getComponent, modalOnly} = this.props

    const securityDefinitions = specSelectors.securityDefinitions()
    const authorizableDefinitions = authSelectors.definitionsToAuthorize()

    const AuthorizeBtn = getComponent("authorizeBtn")

    return securityDefinitions ? (
      <AuthorizeBtn
        onClick={() => authActions.showDefinitions(authorizableDefinitions)}
        isAuthorized={!!authSelectors.authorized().size}
        showPopup={!!authSelectors.shownDefinitions()}
        getComponent={getComponent}
        modalOnly={modalOnly}
      />
    ) : null
  }
}
