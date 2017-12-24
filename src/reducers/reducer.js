const defaultState = {
  data: [],
  size: 0
}

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'ADD':
      return {
        ...state,
        data: [
          ...state.data,
          {
            id: state.size + 1,
            value: action.data
          }
        ],
        size: state.size + 1
      }

    case 'INIT':
      return {
        ...state,
        data: [
          ...state.data,
          ...action.data
        ],
        size: action.size
      }
    default: return state;
  }
}

export default reducer;