import * as React from "react"

interface IActionsContext {
  onHide: () => void
}

const ActionsContext = React.createContext({} as IActionsContext)

export default ActionsContext
