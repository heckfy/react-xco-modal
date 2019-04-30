const ESC_KEY = 27
const TAB_KEY = 9

const handleBackwardTab = (event: KeyboardEvent, focusableElements: HTMLElement[]) => {
  if (document.activeElement === focusableElements[0]) {
    event.preventDefault()
    focusableElements[focusableElements.length - 1].focus()
  }
}

const handleForwardTab = (event: KeyboardEvent, focusableElements: HTMLElement[]) => {
  if (document.activeElement === focusableElements[focusableElements.length - 1]) {
    event.preventDefault()
    focusableElements[0].focus()
  }
}

const handleKeyPress = (
  event: KeyboardEvent,
  focusableElements: HTMLElement[],
  shouldCloseOnEsc: boolean,
  onHide: () => void
) => {
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
          handleBackwardTab(event, focusableElements)
        } else {
          handleForwardTab(event, focusableElements)
        }
      }
      break
  }
}

const handleOverlayOnClick = (
  event: React.MouseEvent<HTMLDivElement>,
  shouldCloseOnOverlayClick: boolean,
  onHide: () => void
) => {
  event.preventDefault()
  if (event.target === event.currentTarget && shouldCloseOnOverlayClick) {
    onHide()
  }
}

export { handleKeyPress, handleOverlayOnClick }
