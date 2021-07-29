import React from "react"
import PropTypes from "prop-types"



// Create the layout component
export default class OperationsLayout extends React.Component {
  static propTypes = {
    errSelectors: PropTypes.object.isRequired,
    errActions: PropTypes.object.isRequired,
    specSelectors: PropTypes.object.isRequired,
    oas3Selectors: PropTypes.object.isRequired,
    oas3Actions: PropTypes.object.isRequired,
    getComponent: PropTypes.func.isRequired
  }

  render() {
    const {
      getComponent,
      operationPathFilter,
      operationMethodsFilter,
      tags,
      specSelectors
    } = this.props

    let SvgAssets = getComponent("SvgAssets")

    const Operations = getComponent("operations", true)
    const AuthorizeBtnContainer = getComponent("AuthorizeBtnContainer", true)
    const hasSecurityDefinitions = !!specSelectors.securityDefinitions()

    return (
      <div className='swagger-ui'>
        <SvgAssets />
        {hasSecurityDefinitions ? (<AuthorizeBtnContainer modalOnly={true} />) : null}
        <Operations operationPathFilter={operationPathFilter} operationMethodsFilter={operationMethodsFilter} tags={tags} />
      </div>
    )
  }
}


OperationsLayout.propTypes = {
  operationPathFilter: PropTypes.array,
  operationMethodsFilter: PropTypes.array,
  tags: PropTypes.array
}
