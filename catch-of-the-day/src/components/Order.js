import React, { Component } from "react";
import { formatPrice } from "../helpers";

class Order extends Component {
  renderOrder = (key) => {
    const fish = this.props.fishes[key];
    const count = this.props.order[key];
    const available = fish && fish.status === "available";
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
      </li>
    );
  };
  render() {
    const { order, fishes } = this.props;
    const orderIds = Object.keys(order);
    const total = orderIds.reduce(
      (total, key) =>
        total +
        order[key] * fishes[key].price * (fishes[key].status === "available"),
      0
    );
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
