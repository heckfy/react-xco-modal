import * as React from "react"
import * as styles from "./styles.scss"
import ActionsContext from "./ActionsContext"
import ModalBody from "./ModalBody"
import ModalButton from "./ModalButton"
import ModalFooter from "./ModalFooter"
import ModalHeader from "./ModalHeader"
import ReactDOM from "react-dom"
import getScrollBarSize from "rc-util/lib/getScrollBarSize"

interface IModalProps {
  show: boolean
  onHide: () => void
}

class Modal extends React.PureComponent<IModalProps, {}> {
  private id: string

  constructor(props: IModalProps) {
    super(props)
    this.patchBodyAttributes = this.patchBodyAttributes.bind(this)
  }

  public componentDidMount() {
    this.id = Math.random()
      .toString(36)
      .substr(2, 9)
  }

  public render(): React.ReactNode {
    this.patchBodyAttributes()
    const { show, children, onHide } = this.props
    if (!show) {
      return null
    }
    return ReactDOM.createPortal(
      <ActionsContext.Provider value={{ onHide }}>
        <div className={styles.modal}>
          <div className={styles.modal_content}>{children}</div>
        </div>
      </ActionsContext.Provider>,
      document.querySelector("body")
    )
  }

  private showPatch() {
    document.body.setAttribute("data-modal-id", this.id)
    document.body.style["overflow"] = "hidden"
    document.body.style["paddingRight"] = `${getScrollBarSize()}px`
  }

  private hidePatch() {
    document.body.removeAttribute("data-modal-id")
    document.body.style["overflow"] = "auto"
    document.body.style["paddingRight"] = ""
  }

  private patchBodyAttributes = () => {
    if (this.props.show) {
      this.showPatch()
    } else {
      if (document.body.getAttribute("data-modal-id") === this.id) {
        this.hidePatch()
      }
    }
  }
}

export { Modal, ModalBody, ModalButton, ModalFooter, ModalHeader }
