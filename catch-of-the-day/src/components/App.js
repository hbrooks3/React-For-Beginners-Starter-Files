import React, { Component } from "react";
import PropTypes from "prop-types";

import Header from "./Header";
import Inventory from "./Inventory";
import Order from "./Order";
import Fish from "./Fish";

import base from "../base";
import sampleFishes from "../sample-fishes";

class App extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
  };

  state = {
    fishes: {},
    order: {},
  };

  componentDidMount() {
    const storeId = this.props.match.params.storeId;
    const localStorageRef = localStorage.getItem(storeId);
    if (localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) });
    }
    this.ref = base.syncState(`${storeId}/fishes`, {
      context: this,
      state: "fishes",
    });
  }
  componentWillUnmount() {
    base.removeBinding(this.ref);
  }
  componentDidUpdate() {
    localStorage.setItem(
      this.props.match.params.storeId,
      JSON.stringify(this.state.order)
    );
  }

  addFish = (fish) => {
    this.updateFish(`fish${Date.now()}`)(fish);
  };
  updateFish = (key) => (updatedFish) => {
    this.setState({ fishes: { ...this.state.fishes, [key]: updatedFish } });
  };
  deleteFish = (key) => () => {
    this.updateFish(key)(null);
  };
  loadSampleFishes = () => {
    this.setState({ fishes: sampleFishes });
  };

  addToOrder = (key) => () => {
    const order = { ...this.state.order };
    order[key] = order[key] + 1 || 1;
    this.setState({ order });
  };
  removeFromOrder = (key) => () => {
    const order = { ...this.state.order };
    delete order[key];
    this.setState({ order });
  };

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map((key) => (
              <Fish
                key={key}
                details={this.state.fishes[key]}
                addToOrder={this.addToOrder(key)}
              />
            ))}
          </ul>
        </div>
        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          removeFromOrder={this.removeFromOrder}
        />
        <Inventory
          fishes={this.state.fishes}
          addFish={this.addFish}
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}
          loadSampleFishes={this.loadSampleFishes}
          storeId={this.props.match.params.storeId}
        />
      </div>
    );
  }
}

export default App;
