import React, { Component } from "react";
import PropTypes from "prop-types";

class EditFishForm extends Component {
  static propTypes = {
    fish: PropTypes.shape({
      image: PropTypes.string,
      name: PropTypes.string,
      price: PropTypes.number,
      desc: PropTypes.string,
      status: PropTypes.string,
    }),
    updateFish: PropTypes.func,
    deleteFish: PropTypes.func,
  };

  handleChange = (event) => {
    const newFish = {
      ...this.props.fish,
      [event.currentTarget.name]: event.currentTarget.value,
    };
    this.props.updateFish(newFish);
  };

  render() {
    const fish = this.props.fish;
    return (
      <div className="fish-edit">
        <input
          name="name"
          value={fish.name}
          type="text"
          onChange={this.handleChange}
        />
        <input
          name="price"
          value={fish.price}
          type="text"
          onChange={this.handleChange}
        />
        <select name="status" value={fish.status} onChange={this.handleChange}>
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea name="desc" value={fish.desc} onChange={this.handleChange} />
        <input
          name="image"
          value={fish.image}
          onChange={this.handleChange}
          type="text"
        />
        <button onClick={this.props.deleteFish}>Remove Fish</button>
      </div>
    );
  }
}

export default EditFishForm;
