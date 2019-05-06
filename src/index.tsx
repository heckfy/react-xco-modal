import React, {
  CSSProperties,
  FunctionComponent,
  ReactNode,
  useEffect,
  useRef
} from "react"
import { createPortal } from "react-dom"
import { getFocusableElements } from "utils"

interface IModalProps {
  children: ReactNode | ReactNode[]
  parentSelector?: HTMLElement
  shouldCloseOnEsc?: boolean
  shouldCloseOnOverlayClick?: boolean
  show: boolean
  style?: { [key: string]: CSSProperties }
  onHide: () => void
}

const ESC_KEY = 27
const TAB_KEY = 9

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
}) => {
  const handleBackwardTab = (event: KeyboardEvent) => {
    if (document.activeElement === focusableElements[0]) {
      event.preventDefault()
      focusableElements[focusableElements.length - 1].focus()
    }
  }

  const handleForwardTab = (event: KeyboardEvent) => {
    if (document.activeElement === [...focusableElements].pop()) {
      event.preventDefault()
      focusableElements[0].focus()
    }
  }

  const handleKeyPress = (event: KeyboardEvent) => {
    switch (event.keyCode) {
      case ESC_KEY:
        {
          if (shouldCloseOnEsc) {
            event.stopPropagation()
            onHide()
          }
        }
        break
      case TAB_KEY:
        {
          if (focusableElements.length === 1) {
            event.preventDefault()
          }
          if (event.shiftKey) {
            handleBackwardTab(event)
          } else {
            handleForwardTab(event)
          }
        }
        break
    }
  }

  const handleOverlayOnClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault()
    if (event.target === event.currentTarget && shouldCloseOnOverlayClick) {
      onHide()
    }
  }

  if (!show) {
    document.removeEventListener("keydown", handleKeyPress, false)
    focusedElementBeforeShow && focusedElementBeforeShow.focus()
    return null
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress, false)
    focusableElements = getFocusableElements(ref.current)
    focusableElements[0].focus()
    focusedElementBeforeShow = document.activeElement as HTMLElement
  }, [])

  const ref = useRef(null)
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
  onHide: () => {}
}

export { Modal }
