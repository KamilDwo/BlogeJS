import React from "react";
import { StyledPagination } from "../styles/Styles.style";
import { connect } from "react-redux";
import axios from "axios";
import "moment-timezone";
import CreateTable from "../helpers/Table.helper";
import ItemsRender from "../helpers/Pagination.helper";

class Timeline extends React.PureComponent {
  state = {
    rows: null,
    page: 1,
    errors: null,
    allRows: 0,
    pages: 0
  };

  componentDidMount() {
    const { props } = this;
    if (props.page.currentPage !== 1) {
      props.onPageUpdate({ currentPage: 1 });
    }
    this.getPosts(1);
  }

  getPosts = page => {
    let component = this;
    axios
      .get("http://127.0.0.1:3002/post")
      .then(function(response) {
        let posts = response.data;
        let postsPagination;
        let numberOfPages = Math.floor((posts.length + 21 - 0) / 21);
        let start = page * 21 - (21 - 0);
        let end = Math.min(start + 21 - 0, posts.length);

        postsPagination = posts.slice(start, end);
        component.setState({
          page: page,
          rows: postsPagination,
          allRows: posts.length,
          pages: numberOfPages
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  changePage = page => {
    this.getPosts(page);
  };

  render() {
    const { allRows, page, rows } = this.state;

    return (
      <>
        <CreateTable postsData={rows} />
        <StyledPagination
          total={allRows}
          pageSize={21}
          current={page}
          itemRender={ItemsRender}
          onChange={this.changePage}
        />
      </>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  page: state.page
});

const mapDispatchToProps = dispatch => ({
  onPageUpdate: page => {
    dispatch({
      type: "SET_PAGE",
      payload: page
    });
  },
  onLoginModalClose: user => {
    dispatch({
      type: "CLOSE_MODAL",
      payload: user
    });
  }
});

const StoredTimeline = connect(
  mapStateToProps,
  mapDispatchToProps
)(Timeline);

export default StoredTimeline;
