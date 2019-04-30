import * as s from "./styles.scss"
import React, { CSSProperties, FunctionComponent, ReactNode, useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import { getFocusableElements } from "utils"
import { handleKeyPress, handleOverlayOnClick } from "handles"

interface IModalProps {
  children: ReactNode | ReactNode[]
  show: boolean
  shouldCloseOnOverlayClick?: boolean
  shouldCloseOnEsc?: boolean
  style?: CSSProperties
  onHide: () => void
}

let focusableElements: HTMLElement[] = []
let focusedElementBeforeShow: HTMLElement = null

const Modal: FunctionComponent<IModalProps> = ({
  children,
  show,
  style,
  shouldCloseOnEsc = true,
  shouldCloseOnOverlayClick = true,
  onHide
}) => {
  const onKeyPress = (event: KeyboardEvent) => handleKeyPress(event, focusableElements, shouldCloseOnEsc, onHide)
  const onOverlayClick = (event: React.MouseEvent<HTMLDivElement>) =>
    handleOverlayOnClick(event, shouldCloseOnOverlayClick, onHide)

  if (!show) {
    document.removeEventListener("keydown", onKeyPress, false)
    focusedElementBeforeShow && focusedElementBeforeShow.focus()
    return null
  }
  document.addEventListener("keydown", onKeyPress, false)
  useEffect(() => {
    focusableElements = getFocusableElements(ref.current)
    focusableElements[0].focus()
  }, [])
  focusedElementBeforeShow = document.activeElement as HTMLElement
  const ref = useRef(null)
  return createPortal(
    <div {...{ className: s.modal, style, onClick: onOverlayClick, ref }}>
      <div className={s.modal_content}>{children}</div>
    </div>,
    document.querySelector("body")
  )
}

export { Modal }
