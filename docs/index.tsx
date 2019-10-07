import React, { Fragment, useState, FunctionComponent } from "react"
import ReactDOM from "react-dom"
import Modal from "./../src"

const App: FunctionComponent<{}> = () => {
  const [show, setShow] = useState(false)
  const hideModal = () => setShow(false)
  const customStyles = {
    overlay: { background: "rgba(83, 83, 83, 0.5)" }
  }
  return (
    <Fragment>
      <form>
        <input type="text" />
      </form>
      <button onClick={() => setShow(true)}>Show modal</button>
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
