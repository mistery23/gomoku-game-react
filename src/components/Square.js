import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Square extends Component {

  static propTypes = {
    checked: PropTypes.bool,
    winnerLine: PropTypes.string,
    onClick: PropTypes.func,
    type: PropTypes.string,
  }

  static defaultProps = {
    checked: false,
    winnerLine: '',
    style: 'info',
    type: '',
  };

  render() {
    const { props } = this;
    let icon;

    switch (props.type) {
      case 'cross':
        icon = "fui-cross"
        break
      case 'circle':
        icon = "fui-radio-unchecked"
        break
      default:
        icon = ""
        break
    }

    return (
      <div
        // square--${props.winnerLine !== ''?'winner':''}
        className={`
          square 
          square--${props.type} 
          ${props.checked ? "active" : ""}
        `}
        onClick={props.onClick}
      >
        <span className={icon} />
      </div>
    );
  }
}
export default Square;