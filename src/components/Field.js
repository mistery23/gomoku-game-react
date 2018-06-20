import React, { Component } from "react";
import PropTypes from 'prop-types';
import uuid from "uuid/v4";


class Field extends Component {
  constructor(props) {
    super(props);

    const { value, name, label } = props;

    this.state = {
      value: value || "",
      name: name || label
    };
  }

  handleChange = e => {
    this.setState({ value: e.target.value });
  };

  componentWillReceiveProps(nextProps){
    const {state} = this;
    if(nextProps.value !== state.value){
      this.setState({
        value: nextProps.value
      })
    }
  }

  render() {
    const { name, value } = this.state;
    const {
      type,
      label,
      right,
      classes,
      textarea
    } = this.props;
    const id = uuid();

    const attrs = {
      name: name.toLowerCase(),
      ref: el => (this.ref = el),
      type: type || "text",
      className: `field__input ${value.length > 0 ? "is-focus" : ""}`,
      autoComplete: `react-${name.toLowerCase()}`,
      id,
      value
    };

    return (
      <div
        className={`field 
        ${right ? "field--right" : ""} 
        ${classes || ""}
        `}
      >
        {!textarea && <input {...attrs} onChange={this.handleChange} />}

        {textarea && (
          <textarea {...attrs} rows="6" onChange={this.handleChange} />
        )}

        <label className="field__label" htmlFor={id}>{label}</label>
      </div>
    );
  }
}

Field.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  right: PropTypes.bool,
  textarea: PropTypes.bool,
  classes: PropTypes.string,
}

export default Field;
