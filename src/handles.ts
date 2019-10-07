const ESC_KEY = 27
const TAB_KEY = 9

const handleKeyPress = (
  focusableElements: HTMLElement[],
  shouldCloseOnEsc: boolean,
  onHide: () => void
) => (event: KeyboardEvent) => {
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

const handleOverlayClick = (
  shouldCloseOnOverlayClick: boolean,
  onHide: () => void
) => (event: React.MouseEvent<HTMLDivElement>) => {
  event.preventDefault()
  if (event.target === event.currentTarget && shouldCloseOnOverlayClick) {
    onHide()
  }
}

export { handleKeyPress, handleOverlayClick }
