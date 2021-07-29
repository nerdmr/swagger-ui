import React from "react"
import PropTypes from "prop-types"
import Im from "immutable"

const SWAGGER2_OPERATION_METHODS = [
  "get", "put", "post", "delete", "options", "head", "patch"
]

const OAS3_OPERATION_METHODS = SWAGGER2_OPERATION_METHODS.concat(["trace"])


export default class Operations extends React.Component {

  static propTypes = {
    specSelectors: PropTypes.object.isRequired,
    specActions: PropTypes.object.isRequired,
    oas3Actions: PropTypes.object.isRequired,
    getComponent: PropTypes.func.isRequired,
    oas3Selectors: PropTypes.func.isRequired,
    layoutSelectors: PropTypes.object.isRequired,
    layoutActions: PropTypes.object.isRequired,
    authActions: PropTypes.object.isRequired,
    authSelectors: PropTypes.object.isRequired,
    getConfigs: PropTypes.func.isRequired,
    fn: PropTypes.func.isRequired
  };

  render() {
    let {
      specSelectors,
      operationPathFilter,
      operationMethodsFilter,
      tags
    } = this.props


    let taggedOps = specSelectors.taggedOperations()



    // // eslint-disable-next-line no-console
    // console.log("REDNER", operationPathFilter)

    // if (tags && tags.length > 0) {
    //   // filter by tag
    //   taggedOps = taggedOps.filter((val, key) => {
    //     return tags.some(item => key === item)
    //   })


    //   // // delete any ops or filters that don't match our patterns
    //   // const taggedOpsValues = taggedOps.values()
    //   // let tag = taggedOpsValues.next()
    //   // while (!tag.done) {
    //   //   // eslint-disable-next-line no-console
    //   //   console.log(tag.value) // 1 3 5 7 9


    //   //   let tagDetails = tag.value.entries()
    //   //   while(!tagDetails.done) {
    //   //     // eslint-disable-next-line no-console
    //   //     console.log("td", tagDetails) // 1 3 5 7 9
    //   //     tagDetails = taggedOpsValues.next()
    //   //   }

    //   //   tag = taggedOpsValues.next()
    //   // }


    //   .map((val) => {
    //     // eslint-disable-next-line no-console
    //     val.set("operations2", [...val.get("operations").delete(0)])
    //     // eslint-disable-next-line no-console
    //     console.log("ops??", val, val.get("operations"), val.get("operations").delete(0), val.get("operations2"))

    //     val.set("test", "hello")

    //     // eslint-disable-next-line no-console
    //     console.log(val.get("test"))

    //     return val

    //     // val.set("operations", ...val.get("operations").filter((operation) => {
    //     //   return false && (
    //     //     (
    //     //       (
    //     //         !operationMethodsFilter ||
    //     //         operationMethodsFilter.length === 0 ||
    //     //         operationMethodsFilter.some(method => operation.get("method").indexOf(method) !== -1)
    //     //       )
    //     //     ) &&
    //     //     (
    //     //       (
    //     //         !operationPathFilter ||
    //     //         operationPathFilter.length === 0 ||
    //     //         operationPathFilter.some(path => operation.get("path").indexOf(path) !== -1))
    //     //       )
    //     //     )
    //     // }))

    //   //   // eslint-disable-next-line no-console
    //   //   // console.log("Map", val, [...val], [...val]
    //   //   // .filter(([key, value]) => {
    //   //   //   return true
    //   //   // }))

    //   //   val = new Map(
    //   //     [...val]
    //   //     .filter(([key, value]) => {
    //   //       if (key !== "operation") {
    //   //         return true
    //   //       } else {
    //   //         return true
    //   //       }

    //   //       // eslint-disable-next-line no-console
    //   //       // console.log("keyop", key, operation)
    //   //       // return true
    //   //     })
    //   //   )

    //   //   // eslint-disable-next-line no-console
    //   //   // console.log("filtereops", val)

    //   //   setTimeout(() => {

    //   //   }, 0)
    //   //   return val
    //   })
    // }

    // eslint-disable-next-line no-console
    // console.log("taggedopssss", taggedOps)

    // eslint-disable-next-line no-console
    // console.log("operations comp", this.opsFilter, taggedOps)

    if(taggedOps.size === 0) {
      return <h3> No operations defined in spec!</h3>
    }

    // taggedOps = new Map(
    //   [...taggedOps] // step 1
    //   .filter(([k, v]) => false) // step 2
    // )


    return (
      <div>
        { taggedOps.map(this.renderOperationTag).toArray() }
        { taggedOps.size < 1 ? <h3> No operations defined in spec! </h3> : null }
      </div>
    )
  }



  renderOperationTag = (tagObj, tag) => {
    const {
      specSelectors,
      getComponent,
      oas3Selectors,
      layoutSelectors,
      layoutActions,
      getConfigs,
    } = this.props
    const OperationContainer = getComponent("OperationContainer", true)
    const OperationTag = getComponent("OperationTag")
    const operations = tagObj.get("operations")
    return (
      <OperationTag
        key={"operation-" + tag}
        tagObj={tagObj}
        tag={tag}
        oas3Selectors={oas3Selectors}
        layoutSelectors={layoutSelectors}
        layoutActions={layoutActions}
        getConfigs={getConfigs}
        getComponent={getComponent}
        specUrl={specSelectors.url()}>
        <div className="operation-tag-content">
          {
            operations.map(op => {
              const path = op.get("path")
              const method = op.get("method")
              const specPath = Im.List(["paths", path, method])


              // FIXME: (someday) this logic should probably be in a selector,
              // but doing so would require further opening up
              // selectors to the plugin system, to allow for dynamic
              // overriding of low-level selectors that other selectors
              // rely on. --KS, 12/17
              const validMethods = specSelectors.isOAS3() ?
                OAS3_OPERATION_METHODS : SWAGGER2_OPERATION_METHODS

              if (validMethods.indexOf(method) === -1) {
                return null
              }

              return (
                <OperationContainer
                  key={`${path}-${method}`}
                  specPath={specPath}
                  op={op}
                  path={path}
                  method={method}
                  tag={tag} />
              )
            }).toArray()
          }
        </div>
      </OperationTag>
    )
  }

}

Operations.propTypes = {
  layoutActions: PropTypes.object.isRequired,
  specSelectors: PropTypes.object.isRequired,
  operationPathFilter: PropTypes.array,
  operationMethodsFilter: PropTypes.array,
  tags: PropTypes.array,
  specActions: PropTypes.object.isRequired,
  layoutSelectors: PropTypes.object.isRequired,
  getComponent: PropTypes.func.isRequired,
  fn: PropTypes.object.isRequired
}
