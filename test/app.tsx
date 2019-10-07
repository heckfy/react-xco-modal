import React, { CSSProperties, Component, ReactNode } from "react"
import Modal from "./../src"

interface AppProps {
  children?: string | ReactNode | ReactNode[]
  parentSelector?: HTMLElement
  shouldCloseOnEsc?: boolean
  shouldCloseOnOverlayClick?: boolean
  show?: boolean
  style?: { [key: string]: CSSProperties }
  onHide?: () => void
}

class App extends Component<AppProps, {}> {
  state = { show: true }

  hideModal = () => this.setState({ show: false })

  render() {
    const {
      hideModal,
      props,
      state: { show }
    } = this
    return (
      <Modal show={show} onHide={hideModal} {...props}>
        this is a Popover
      </Modal>
    )
  }
}

export default App
