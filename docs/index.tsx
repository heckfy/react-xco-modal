import React, { Fragment, useState, FunctionComponent } from "react"
import ReactDOM from "react-dom"
import { Modal, ModalHeader, ModalBody, ModalFooter, ModalButton } from "./../src"

const App: FunctionComponent<{}> = () => {
  const [show, setShow] = useState(false)
  const hideModal = () => setShow(false)
  return (
    <Fragment>
      <button onClick={() => setShow(true)}>SHOW</button>
      <Modal show={show} onHide={hideModal}>
        <ModalHeader closeButton>
          <h1>ModalHeader</h1>
        </ModalHeader>
        <ModalBody>
          <h1>ModalBody</h1>
        </ModalBody>
        <ModalFooter>
          <ModalButton value="OK" onClick={hideModal} />
        </ModalFooter>
      </Modal>
    </Fragment>
  )
}

ReactDOM.render(<App />, document.getElementById("root"))
