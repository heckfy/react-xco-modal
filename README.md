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
import { Modal, ModalHeader, ModalBody, ModalFooter } from "react-xco-modal"

const App = () => {
  const [show, setShow] = useState(false)
  const hideModal = () => setShow(false)
  const customStyles = {
    background: "rgba(255, 0, 255, 0.5)"
  }
  return (
    <Fragment>
      <button onClick={() => setShow(true)}>SHOW</button>
      <Modal show={show} onHide={hideModal} style={customStyles}>
        <ModalHeader closeButton>
          <h1>ModalHeader</h1>
        </ModalHeader>
        <ModalBody>
          <h1>ModalBody</h1>
        </ModalBody>
        <ModalFooter>
          <button onClick={hideModal}>OK</button>
        </ModalFooter>
      </Modal>
    </Fragment>
  )
}

ReactDOM.render(<App />, document.getElementById("root"))
```

```jsx
<Modal
  /*
    Boolean describing if the modal should be shown or not.
  */
  show={false}
  /*
    Function that will be run when the modal is requested to be closed (either by clicking on overlay or pressing ESC)
  */
  onHide={handleOnHideFunc}
  /*
    Boolean indicating if the overlay should close the modal
  */
  shouldCloseOnOverlayClick={true}
/>
```
