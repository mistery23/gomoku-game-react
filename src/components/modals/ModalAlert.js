import React, { Component } from "react";
import Modal from "./Modal";
import Button from "../Button";

class ModalAlert extends Component {

  constructor(props) {
    super(props);

    const { show, text } = props;

    this.state = {
      showModal: show || false,
      text: text || ""
    };
  }

  componentWillReceiveProps(nextProp) {
    const { show, success, text } = nextProp;

    this.setState({
      showModal: show,
      success,
      text
    });
  }

  handleSuccess = () => {
    const { success } = this.state;
    success();
  }

  model() {

    return (
      <div className="modal__model">
        <p className="text text--center">{this.state.text}</p>
        <div className="btn-line">
          <Button text="New game" onClick={this.handleSuccess} />
        </div>
      </div>

    )
  }

  render() {
    return <Modal
      {...this.props}
      model={this.model()}
      disableClose
    />
  }
}

export default ModalAlert;
