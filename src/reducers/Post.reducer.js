const initialState = {
  showPostModal: false,
  addPostModalText: ''
}

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'POST_ADDED':
      return action.payload
    case 'SHOW_POST_FORM':
      return { ...state, showPostModal: action.payload.showPostModal }
    case 'HIDE_POST_FORM':
      return { ...state, showPostModal: action.payload.showPostModal }
    default:
      return state
  }
}

export default postReducer
