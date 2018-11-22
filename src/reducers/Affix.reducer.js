const initialState = {
  affixed: false
}

const affixReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_AFFIXED':
      return action.payload
    default:
      return state
  }
}

export default affixReducer