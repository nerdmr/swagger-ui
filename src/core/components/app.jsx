import React from "react"
import PropTypes from "prop-types"

export default class App extends React.Component {

  getLayout() {
    let { getComponent, layoutSelectors } = this.props
    const layoutName = layoutSelectors.current()
    const Component = getComponent(layoutName, true)
    return Component ? Component : ()=> <h1> No layout defined for &quot;{layoutName}&quot; </h1>
  }

  render() {
    let { operationFilter, getComponent } = this.props

    // eslint-disable-next-line no-console
    // console.log("opsfiltersapp|", operationFilter)

    if (operationFilter) {
      const OperationsLayout = getComponent("OperationsLayout", true)

      return (
        <OperationsLayout operations={[operationFilter]}/>
      )
    } else {
      const Layout = this.getLayout()

      return (
        <Layout/>
      )
    }




  }
}

App.propTypes = {
  getComponent: PropTypes.func.isRequired,
  operationFilter: PropTypes.string,
  action: PropTypes.string,
  layoutSelectors: PropTypes.object.isRequired,
}

App.defaultProps = {
}
