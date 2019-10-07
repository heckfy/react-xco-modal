import React from "react"
import Adapter from "enzyme-adapter-react-16"
import App from "./app"
import Enzyme, { mount } from "enzyme"
import Modal from "./../src"
import { act } from "react-dom/test-utils"

Enzyme.configure({ adapter: new Adapter() })

describe("Modal", () => {
  it("should be has default props", () => {
    const component = mount(<Modal>this is a Popover</Modal>)
    expect(component.prop("parentSelector")).toEqual(document.body)
    expect(component.prop("shouldCloseOnEsc")).toBeTruthy()
    expect(component.prop("shouldCloseOnOverlayClick")).toBeTruthy()
    expect(component.prop("show")).toBeFalsy()
    expect(component.prop("style")).toEqual({})
    expect(component.prop("onHide")).toEqual(expect.any(Function))
  })

  describe("show", () => {
    it("should be show", () => {
      const component = mount(<Modal show={true} />)
      expect(component.exists("div")).toBeTruthy()
    })

    it("should be hide", () => {
      const component = mount(<Modal show={false} />)
      expect(component.exists("div")).toBeFalsy()
    })
  })

  describe("shouldCloseOnEsc", () => {
    const ESC_KEY = 27
    const map: { [key: string]: any } = {}
    document.addEventListener = jest.fn((event, cb) => (map[event] = cb))

    it("should close modal after esc press when shouldCloseOnEsc is true", () => {
      const component = mount(<App shouldCloseOnEsc={true} />)
      act(() => map.keydown({ keyCode: ESC_KEY, stopPropagation: () => {} }))
      expect(component.state("show")).toEqual(false)
    })

    it("should not close modal after esc press when shouldCloseOnEsc is false", () => {
      const component = mount(<App shouldCloseOnEsc={false} />)
      act(() => map.keydown({ keyCode: ESC_KEY, stopPropagation: () => {} }))
      expect(component.state("show")).toEqual(true)
    })
  })

  describe("shouldCloseOnOverlayClick", () => {
    it("should close modal after esc press when shouldCloseOnOverlayClick is true", () => {
      const component = mount(<App shouldCloseOnOverlayClick={true} />)
      component
        .find("div")
        .first()
        .simulate("click")
      expect(component.state("show")).toEqual(false)
    })

    it("should not close modal after esc press when shouldCloseOnOverlayClick is false", () => {
      const component = mount(<App shouldCloseOnOverlayClick={false} />)
      component
        .find("div")
        .first()
        .simulate("click")
      expect(component.state("show")).toEqual(true)
    })
  })

  describe("style", () => {
    it("should render overlay with custom styles", () => {
      const customStyles = {
        overlay: { background: "#D3D3D3" }
      }
      const component = mount(<Modal show={true} style={customStyles} />)
      expect(
        component
          .find("div")
          .first()
          .prop("style")
      ).toHaveProperty("background", "#D3D3D3")
    })
    it("should render modal with custom styles", () => {
      const customStyles = {
        modal: { background: "#D3D3D3" }
      }
      const component = mount(<Modal show={true} style={customStyles} />)
      expect(
        component
          .find("div")
          .last()
          .prop("style")
      ).toHaveProperty("background", "#D3D3D3")
    })
  })

  describe("parentSelector", () => {
    it("should render modal into div", () => {
      const modalRoot = document.createElement("div")
      modalRoot.setAttribute("id", "modal-root")
      const body = document.querySelector("body")
      body.appendChild(modalRoot)
      const component = mount(
        <Modal
          show={true}
          parentSelector={document.querySelector("#modal-root")}
        />
      )
      expect(component.find("Portal").prop("containerInfo")).toEqual(modalRoot)
    })
  })
})
