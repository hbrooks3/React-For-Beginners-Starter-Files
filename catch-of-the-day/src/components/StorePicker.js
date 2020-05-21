import React, { Component } from "react";
import PropTypes from "prop-types";

import { getFunName } from "../helpers";

class StorePicker extends Component {
  static propTypes = {
    history: PropTypes.object,
  };

  myInput = React.createRef();

  goToStore = (event) => {
    // Stop the form from submitting
    event.preventDefault();
    // Get text from input
    const storeId = this.myInput.current.value;
    // Change the page to /store/input
    this.props.history.push(`/store/${storeId}`);
  };

  render() {
    return (
      <form className="store-selector" onSubmit={this.goToStore}>
        <h2>Please Enter A Store</h2>
        <input
          type="text"
          ref={this.myInput}
          required
          placeholder="Store Name"
          defaultValue={getFunName()}
        />
        <button type="submit">Visit Store →</button>
      </form>
    );
  }
}

export default StorePicker;
