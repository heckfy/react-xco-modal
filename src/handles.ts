const ESC_KEY = 27
const TAB_KEY = 9

const handleKeyPress = (
  focusableElements: HTMLElement[],
  shouldCloseOnEsc: boolean,
  onHide: () => void
) => (e: KeyboardEvent): void => {
  const handleBackwardTab = (e: KeyboardEvent): void => {
    if (document.activeElement === focusableElements[0]) {
      e.preventDefault()
      focusableElements[focusableElements.length - 1].focus()
    }
  }

  const handleForwardTab = (e: KeyboardEvent): void => {
    if (document.activeElement === [...focusableElements].pop()) {
      e.preventDefault()
      focusableElements[0].focus()
    }
  }

  switch (e.keyCode) {
    case ESC_KEY:
      {
        if (shouldCloseOnEsc) {
          e.stopPropagation()
          onHide()
        }
      }
      break
    case TAB_KEY:
      {
        if (focusableElements.length === 1) e.preventDefault()
        e.shiftKey ? handleBackwardTab(e) : handleForwardTab(e)
      }
      break
  }
}

const handleOverlayClick = (
  shouldCloseOnOverlayClick: boolean,
  onHide: () => void
) => (e: React.MouseEvent<HTMLDivElement>): void => {
  e.preventDefault()
  if (e.target === e.currentTarget && shouldCloseOnOverlayClick) onHide()
}

export { handleKeyPress, handleOverlayClick }
