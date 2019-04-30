import * as React from "react"
import * as styles from "./styles.scss"

interface IModalBodyProps {
  children: React.ReactNode | React.ReactNode[]
  style?: React.CSSProperties
}

const ModalBody: React.FunctionComponent<IModalBodyProps> = ({ children, style }) => (
  <div className={styles.modal_body} style={style}>
    {children}
  </div>
)

export default ModalBody
