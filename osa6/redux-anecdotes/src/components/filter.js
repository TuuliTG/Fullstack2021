import React from 'react'
import { filterChange } from '../reducers/filterReducer'
import { connect } from 'react-redux'

const Filter = (props) => {
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={({ target }) => props.filterChange(target.value)} />
    </div>
  )
}
const mapStateToProps = (state) => {
    return {
        filter: state.filter
    }
}
const mapDispatchToProps = {
    filterChange
}
const ConnectedFilter = connect(
    mapStateToProps,
    mapDispatchToProps
    )(Filter)
export default ConnectedFilter