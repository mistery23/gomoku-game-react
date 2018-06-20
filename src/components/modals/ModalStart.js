import React, { Component } from "react";

import Modal from "./Modal";
import Field from "../Field";
import Button from "../Button";

class ModalStart extends Component {
  constructor(props) {
    super(props);

    const { show, gamers } = props;

    this.state = {
      showModal: show || false,
      editError: false,
      commentError: false,
      gamers
    };
  }

  componentWillReceiveProps(nextProp) {
    const { show, gamers } = nextProp;

    this.setState({
      showModal: show,
      gamers
    });
  }

  handleSuccess = e => {
    e.preventDefault();

    const { state, props } = this;
    const { cross, circle } = state.gamers;

    cross.name = this.cross.state.value;
    circle.name = this.circle.state.value;

    if (cross.name.length > 0 && circle.name.length > 0) {
      props.success(state.gamers);
    } else {
      this.setState({
        editError: true
      });
    }
  }

  model() {
    const { state, handleSuccess } = this;
    const { gamers, editError } = state;

    return (
      <div className="modal__model">
        <p className="title">Please entry your names</p>
        <Field
          label="First gamer (circle)"
          value={gamers.circle.name}
          ref={el => (this.circle = el)}
        />
        <Field
          label="Second gamer (cross)"
          value={gamers.cross.name}
          ref={el => (this.cross = el)}
        />
        <div className="btn-line btn-line--with-error">
          {editError && (
            <p className="text text--error">This fields is required</p>
          )}
          <Button text="Start" onClick={handleSuccess} />
        </div>
      </div>
    );
  }

  render() {
    return <Modal
      {...this.props}
      model={this.model()}
      disableClose
    />;
  }
}

export default ModalStart;
