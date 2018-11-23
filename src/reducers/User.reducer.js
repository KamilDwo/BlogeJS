const initialState = {
  loggedUser: (localStorage.getItem('user') ? true : false),
  userName: (localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).userName : ''),
  redirect: false,
  showLoginModal: false,
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return action.payload
    case 'LOGOUT_SUCCESS':
      return action.payload
    case 'OPEN_MODAL':
      return { ...state, showLoginModal: action.payload.showLoginModal }
    case 'CLOSE_MODAL':
      return { ...state, showLoginModal: action.payload.showLoginModal }
    default:
      return state
  }
}

export default userReducer
