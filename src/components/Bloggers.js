import React from 'react'
import { connect } from 'react-redux'

class Bloggers extends React.Component {
  componentDidMount() {
    this.props.onPageUpdate({ currentPage: 2 })
  }

  render(){
    return (<>bloggers</>)
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
