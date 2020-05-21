import React, { Component } from "react";
import PropTypes from "prop-types";

import AddFishForm from "./AddFishForm";
import EditFishForm from "./EditFishForm";

class Inventory extends Component {
  static propTypes = {
    fishes: PropTypes.object,
    updateFish: PropTypes.func,
    deleteFish: PropTypes.func,
    addFish: PropTypes.func,
    loadSampleFishes: PropTypes.func,
  };

  render() {
    const fishes = this.props.fishes;
    return (
      <div className="inventory">
        <h2>Inventory!</h2>
        {Object.keys(fishes).map((key) => (
          <EditFishForm
            key={key}
            fish={fishes[key]}
            updateFish={this.props.updateFish(key)}
            deleteFish={this.props.deleteFish(key)}
          />
        ))}
        <AddFishForm addFish={this.props.addFish} />
        <button onClick={this.props.loadSampleFishes}>
          Load Sample Fishes
        </button>
      </div>
    );
  }
}

export default Inventory;
