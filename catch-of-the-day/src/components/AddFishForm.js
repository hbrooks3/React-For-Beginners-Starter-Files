import React, { Component, createRef } from "react";
import PropTypes from "prop-types";

class AddFishForm extends Component {
  static propTypes = {
    addFish: PropTypes.func.isRequired,
  };

  nameRef = createRef();
  priceRef = createRef();
  statusRef = createRef();
  descRef = createRef();
  imageRef = createRef();

  createFish = (event) => {
    event.preventDefault();
    const fish = {
      name: this.nameRef.current.value,
      price: parseFloat(this.priceRef.current.value),
      status: this.statusRef.current.value,
      desc: this.descRef.current.value,
      image: this.imageRef.current.value,
    };
    this.props.addFish(fish);
    event.currentTarget.reset();
  };

  render() {
    return (
      <form className="fish-edit" onSubmit={this.createFish}>
        <input
          required
          name="name"
          ref={this.nameRef}
          type="text"
          placeholder="Name"
        />
        <input
          required
          name="price"
          ref={this.priceRef}
          type="text"
          placeholder="Price"
        />
        <select required name="status" ref={this.statusRef}>
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea
          required
          name="desc"
          ref={this.descRef}
          placeholder="Description"
        />
        <input
          required
          name="image"
          ref={this.imageRef}
          type="text"
          placeholder="Image"
        />
        <button type="submit">+ Add Fish</button>
      </form>
    );
  }
}

export default AddFishForm;
