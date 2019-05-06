const ESC_KEY = 27
const TAB_KEY = 9

interface IUseHandles {
  handleKeyPress: (event: KeyboardEvent) => void
  handleOverlayOnClick: (event: React.MouseEvent<HTMLDivElement>) => void
}

const useHandles = (
  focusableElements: HTMLElement[],
  shouldCloseOnEsc: boolean,
  shouldCloseOnOverlayClick: boolean,
  onHide: () => void
): IUseHandles => {
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

  return { handleKeyPress, handleOverlayOnClick }
}

export { useHandles }
