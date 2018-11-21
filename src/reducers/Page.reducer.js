const initialState = {
  currentPage: 1
}

const pageReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_PAGE':
      const response = action.payload
      return response
    default:
      return state
  }
}

export default pageReducer