import React, { Component } from "react";
import AddFishForm from "./AddFishForm";
import EditFishForm from "./EditFishForm";

class Inventory extends Component {
  render() {
    const fishes = this.props.fishes;
    return (
      <div className="inventory">
        <h2>Inventory!</h2>
        {Object.keys(fishes).map((key) => (
          <EditFishForm
            key={key}
            id={key}
            fish={fishes[key]}
            updateFish={this.props.updateFish}
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
