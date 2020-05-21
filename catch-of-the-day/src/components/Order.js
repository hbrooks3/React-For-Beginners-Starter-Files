import React, { Component } from "react";
import { formatPrice } from "../helpers";

class Order extends Component {
  renderOrder = (key) => {
    const fish = this.props.fishes[key];
    if (!fish) {
      return null;
    }
    const count = this.props.order[key];
    const available = fish.status === "available";
    if (!available) {
      return (
        <li key={key}>
          Sorry {fish ? fish.name : "fish"} is no longer available
        </li>
      );
    }
    return (
      <li key={key}>
        {count} lbs {fish.name}
        {formatPrice(count * fish.price)}
        <button onClick={this.props.removeFromOrder(key)}>&times;</button>
      </li>
    );
  };
  render() {
    const { order, fishes } = this.props;
    const orderIds = Object.keys(order);
    const total = orderIds.reduce((total, key) => {
      const fish = fishes[key];
      const amount = order[key];
      const isAvailable = fish && fish.status === "available";
      return total + (isAvailable ? fish.price * amount : 0);
    }, 0);
    return (
      <div className="order-wrap">
        <h2>Order</h2>
        <ul className="order">{orderIds.map(this.renderOrder)}</ul>
        <div className="total">
          Total:
          <strong>{formatPrice(total)}</strong>
        </div>
      </div>
    );
  }
}

export default Order;
