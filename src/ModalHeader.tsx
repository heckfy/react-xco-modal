import * as React from "react"
import * as styles from "./styles.scss"
import ActionsContext from "./ActionsContext"

interface IModalHeaderProps {
  closeButton: boolean
}

class ModalHeader extends React.PureComponent<IModalHeaderProps, {}> {
  public render(): React.ReactNode {
    return (
      <div className={styles.modal_header}>
        <ActionsContext.Consumer>
          {context => (
            <React.Fragment>
              {this.props.children}
              {this.renderCloseButton(context.onHide)}
            </React.Fragment>
          )}
        </ActionsContext.Consumer>
      </div>
    )
  }

  private renderCloseButton = (onHide: () => void) => {
    if (this.props.closeButton) {
      return <span className={styles.modal_header_close} onClick={onHide} />
    }
  }
}

export default ModalHeader
