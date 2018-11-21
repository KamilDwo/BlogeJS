import React, {Component} from 'react'
import { connect } from 'react-redux'

class Beloved extends Component {
  componentWillMount() {
    this.props.onPageUpdate({ currentPage: 3 })
  }

  render(){
    return (<h3>Beloved</h3>)
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
