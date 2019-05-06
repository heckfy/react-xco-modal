import React, {
  CSSProperties,
  FunctionComponent,
  ReactNode,
  useEffect,
  useRef
} from "react"
import { createPortal } from "react-dom"
import { getFocusableElements } from "utils"
import { useHandles } from "handles"

interface IModalProps {
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
    background: "rgba(0, 0, 0, 0.5)",
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

let focusableElements: HTMLElement[] = []
let focusedElementBeforeShow: HTMLElement = null

const Modal: FunctionComponent<IModalProps> = ({
  children,
  parentSelector,
  shouldCloseOnEsc,
  shouldCloseOnOverlayClick,
  show,
  style,
  onHide
}): JSX.Element => {
  const { handleKeyPress, handleOverlayOnClick } = useHandles(
    focusableElements,
    shouldCloseOnEsc,
    shouldCloseOnOverlayClick,
    onHide
  )

  if (!show) {
    document.removeEventListener("keydown", handleKeyPress, false)
    focusedElementBeforeShow && focusedElementBeforeShow.focus()
    return null
  }

  const ref = useRef(null)

  useEffect((): void => {
    document.addEventListener("keydown", handleKeyPress, false)
    focusableElements = getFocusableElements(ref.current)
    focusableElements[0].focus()
    focusedElementBeforeShow = document.activeElement as HTMLElement
  }, [])

  return createPortal(
    <div
      {...{
        onClick: handleOverlayOnClick,
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
