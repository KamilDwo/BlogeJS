import React from 'react'
import { connect } from 'react-redux'

class Beloved extends React.Component {
  componentDidMount() {
    this.props.onPageUpdate({ currentPage: 3 })
  }

  render(){
    return (<>Beloved</>)
  }
}

const mapStateToProps = state => ({
  page: state.page
})

const mapDispatchToProps = dispatch => ({
  onPageUpdate: (page) => {
    dispatch({
      type: 'SET_PAGE',
      payload: page
    })
  },
})

const StoredBeloved = connect(mapStateToProps, mapDispatchToProps)(Beloved)

export default StoredBeloved
