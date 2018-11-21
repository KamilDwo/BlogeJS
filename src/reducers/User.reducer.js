const initialState = {
  loggedUser: (localStorage.getItem('user') ? true : false),
  userName: (localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).userName : ''),
  redirect: false
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      const response = action.payload
      return response
    default:
      return state
  }
}

export default userReducer