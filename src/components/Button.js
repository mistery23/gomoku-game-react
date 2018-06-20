import React, { Component } from 'react';
import PropTypes from 'prop-types';


class Button extends Component {

  static propTypes = {
    onClick: PropTypes.func,
    text: PropTypes.string,
    style: PropTypes.string,
    submit: PropTypes.bool
  }

  static defaultProps = {
    style: 'info',
    text: "Text",
    submit: false
  };

  render() {
    const { props } = this;

    return (
      <button type={props.submit?"submit":"button"} className={`btn btn-${props.style}`} onClick={props.onClick}>
        {props.text}
      </button>
    );
  }
}

export default Button;
