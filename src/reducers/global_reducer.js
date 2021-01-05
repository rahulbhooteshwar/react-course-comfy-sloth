import { SIDEBAR_CLOSE, SIDEBAR_OPEN } from "../actions"

const reducer = (state, action) => {
  const { type } = action
  switch (type) {
    case SIDEBAR_OPEN:
      return { ...state, isSidebarOpen: true }
    case SIDEBAR_CLOSE:
      return {...state, isSidebarOpen: false}
    default:
      throw new Error('No matching case for action: ', type)
  }
}

export default reducer