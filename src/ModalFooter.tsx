import * as React from "react"
import * as styles from "./styles.scss"

const ModalFooter: React.FunctionComponent<React.ReactNode> = props => {
  return (
    <div className={styles.modal_footer} {...props}>
      {props.children}
    </div>
  )
}

export default ModalFooter
