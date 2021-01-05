import { createContext, useContext, useReducer } from "react";
import { SIDEBAR_CLOSE, SIDEBAR_OPEN } from "../actions";
import reducer from "../reducers/global_reducer";

const initialState = {
  isSidebarOpen: false
}

const Context = createContext()
export const GlobalProvider = ({ children }) => {
  const [state, disptach] = useReducer(reducer, initialState)
  const openSidebar = () => {
    disptach({type: SIDEBAR_OPEN})
  }
  const closeSidebar = () => {
    disptach({type: SIDEBAR_CLOSE})
  }
  return <Context.Provider value={{...state, openSidebar, closeSidebar}}>{children}</Context.Provider>
}

export const useGlobalContext = () => {
  return useContext(Context)
}