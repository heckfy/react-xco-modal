# react-xco-modal

Modal dialog component for React

## Installation

To install, you can use [npm](https://npmjs.org/) or [yarn](https://yarnpkg.com):

    $ npm install react-xco-modal
    $ yarn add react-xco-modal

## General Usage

The only required prop for the modal object is "show", which indicates whether the modal should be displayed. Here is a simple example of react-xco-modal being used in an app with some custom styles:

```jsx
import React, { Fragment, useState } from "react"
import ReactDOM from "react-dom"
import { Modal } from "react-xco-modal"

const App = () => {
  const [show, setShow] = useState(false)
  const showModal = () => setShow(true)
  const hideModal = () => setShow(false)
  const customStyles = {
    background: "rgba(255, 0, 255, 0.5)"
  }
  return (
    <Fragment>
      <form>
        <input type="text" />
      </form>
      <button onClick={showModal}>Show modal</button>
      <Modal show={show} onHide={hideModal} style={customStyles}>
        <h1>ModalBody</h1>
        <form>
          <input type="text" />
          <input type="text" />
        </form>
        <button onClick={hideModal}>Close modal</button>
      </Modal>
    </Fragment>
  )
}

ReactDOM.render(<App />, document.getElementById("root"))
```

## Props

Common props you may want to specify include:

- `parentSelector: HTMLElement` - element that the modal will be attached to. By default is `document.body`.
- `shouldCloseOnEsc: boolean` - should be pressing esc to close the modal. By default is `true`.
- `shouldCloseOnOverlayClick: boolean` - should be clicking overlay to close the modal. By default is `true`.
- `show: boolean` - describing if the modal should be shown or not.
- `style: object` - object containing styles to be used for the modal. It has two keys, `overlay` and `modal`. By default is `{}`.
- `onHide: function` - function that will be called when the modal is requested to be closed (either by clicking on overlay or pressing ESC)