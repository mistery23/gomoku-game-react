import React, { Component } from "react";
import ReactModal from "react-modal";
import PropTypes from 'prop-types';


ReactModal.setAppElement("#root");

class Modal extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showModal: props.show || false,
    };
  }

  static propTypes = {
    model: PropTypes.element.isRequired,
    show: PropTypes.bool,
    disableClose: PropTypes.bool,
    onRequestClose: PropTypes.func,
  }

  static defaultProps = {
    disableClose: false,
  };

  componentWillReceiveProps(nextProp) {
    this.setState({
      showModal: nextProp.show,
      success: nextProp.success
    });
  }

  handleClose = () => {
    const { props } = this;

    this.setState({
      showModal: false
    });
    props.onRequestClose()

  };

  handleSuccess = () => {
    const { success } = this.state;
    success();
  };

  render() {
    const { props, handleClose } = this;
    const { large, model } = props;
    let classContainer = 'modal ';
    classContainer = large ? classContainer + "modal--large" : classContainer;

    return (

      <ReactModal
        {...props}
        onRequestClose={handleClose}
        className={classContainer}
        overlayClassName="overlay"
        shouldCloseOnOverlayClick={false}
        closeTimeoutMS={200}
      >
        {!props.disableClose &&
          <button className="btn-icon btn-icon--close" onClick={handleClose}>
            <i className="fui-cross" aria-hidden="true" />
          </button>
        }

        {model}

      </ReactModal>
    );
  }
}

export default Modal;
