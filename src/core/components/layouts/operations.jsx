import React from "react"
import PropTypes from "prop-types"

// Create the layout component
export default class OperationsLayout extends React.Component {
  static propTypes = {

    getComponent: PropTypes.func.isRequired
  }

  render() {
    const {
      getComponent,
      operations
    } = this.props

    const Operations = getComponent("operations", true)

    // eslint-disable-next-line no-console
    // console.log("ops layout", operations)

    return (
      <div className='swagger-ui'>
        <Operations operations={operations} />
      </div>
    )
  }
}

// Create the plugin that provides our layout component
// const OperationsLayoutPlugin = () => {
//   return {
//     components: {
//       OperationsLayout: OperationsLayout
//     }
//   }
// }

// Provide the plugin to Swagger-UI, and select OperationsLayout
// as the layout for Swagger-UI
// SwaggerUI({
//   url: "https://petstore.swagger.io/v2/swagger.json",
//   plugins: [ OperationsLayoutPlugin ],
//   layout: "OperationsLayout"
// })

OperationsLayout.propTypes = {
  operations: PropTypes.array
}
