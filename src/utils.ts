const getFocusableElements = (element: HTMLElement): HTMLElement[] =>
  [].slice.call(
    element.querySelectorAll(
      [
        "a[href]",
        "area[href]",
        "input:not([disabled])",
        "select:not([disabled])",
        "textarea:not([disabled])",
        "button:not([disabled])",
        "[tabindex='0']"
      ].join(", ")
    )
  )

const setFocus = (element: HTMLElement): void => element && element.focus()

export { getFocusableElements, setFocus }
