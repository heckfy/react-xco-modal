import React, {
  CSSProperties,
  FunctionComponent,
  ReactNode,
  useEffect,
  useRef
} from "react"
import { createPortal } from "react-dom"
import { getFocusableElements, setFocus } from "utils"
import { handleKeyPress, handleOverlayClick } from "handles"

interface ModalProps {
  children: ReactNode | ReactNode[]
  parentSelector?: HTMLElement
  shouldCloseOnEsc?: boolean
  shouldCloseOnOverlayClick?: boolean
  show: boolean
  style?: { [key: string]: CSSProperties }
  onHide: () => void
}

const defaultStyle = {
  overlay: {
    overflow: "auto",
    position: "fixed" as "fixed",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    background: "rgba(83, 83, 83, 0.5)",
    zIndex: 1000
  },
  modal: {
    background: "#fff",
    minWidth: "980px",
    maxWidth: "1300px",
    width: "90%",
    margin: "30px auto"
  }
}

let focusedElementBeforeShow: HTMLElement = null

const Modal: FunctionComponent<ModalProps> = ({
  children,
  parentSelector,
  shouldCloseOnEsc,
  shouldCloseOnOverlayClick,
  show,
  style,
  onHide
}): JSX.Element => {
  const onOverlayClick = handleOverlayClick(shouldCloseOnOverlayClick, onHide)
  const ref = useRef(null)

  useEffect((): void => {
    const focusableElements: HTMLElement[] = ref.current
      ? getFocusableElements(ref.current)
      : []
    const onKeyPress = handleKeyPress(
      focusableElements,
      shouldCloseOnEsc,
      onHide
    )
    if (show) {
      document.addEventListener("keydown", onKeyPress, false)
      setFocus(focusableElements[0])
      focusedElementBeforeShow = document.activeElement as HTMLElement
    } else {
      document.removeEventListener("keydown", onKeyPress, false)
      setFocus(focusedElementBeforeShow)
    }
  }, [show])

  if (!show) return null

  return createPortal(
    <div
      {...{
        onClick: onOverlayClick,
        ref,
        style: { ...defaultStyle.overlay, ...style.overlay }
      }}
    >
      <div style={{ ...defaultStyle.modal, ...style.modal }}>{children}</div>
    </div>,
    parentSelector
  )
}

Modal.defaultProps = {
  children: null,
  parentSelector: document.querySelector("body"),
  shouldCloseOnEsc: true,
  shouldCloseOnOverlayClick: true,
  show: false,
  style: {},
  onHide: (): void => {}
}

export { Modal }
