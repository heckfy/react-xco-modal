import * as React from "react"
import * as styles from "./styles.scss"

interface IModalButtonProps {
  [key: string]: any
}

const ModalButton: React.FunctionComponent<IModalButtonProps> = props => {
  return <input type="button" className={styles.modal_button} {...props} />
}

export default ModalButton
