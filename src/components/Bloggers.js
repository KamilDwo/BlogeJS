import React, {Component} from 'react'
import { connect } from 'react-redux'

class Bloggers extends Component {
  componentWillMount() {
    this.props.onPageUpdate({ currentPage: 2 })
  }

  render(){
    return (<h3>bloggers</h3>)
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

const StoredBloggers = connect(mapStateToProps, mapDispatchToProps)(Bloggers)

export default StoredBloggers
