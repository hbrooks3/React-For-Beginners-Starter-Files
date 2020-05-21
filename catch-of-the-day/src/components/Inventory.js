import React, { Component } from "react";
import PropTypes from "prop-types";
import firebase from "firebase";

import AddFishForm from "./AddFishForm";
import EditFishForm from "./EditFishForm";
import Login from "./Login";

import base, { firebaseApp } from "../base";

class Inventory extends Component {
  static propTypes = {
    fishes: PropTypes.object,
    updateFish: PropTypes.func,
    deleteFish: PropTypes.func,
    addFish: PropTypes.func,
    loadSampleFishes: PropTypes.func,
    storeId: PropTypes.string,
  };

  state = {
    uid: null,
    owner: null,
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.authHandler({ user });
      }
    });
  }

  authHandler = async (authData) => {
    // Look up the current store in firebase.
    const store = await base.fetch(this.props.storeId, { context: this });
    const uid = authData.user.uid;
    // Claim store if there is no owner
    if (!store.owner) {
      await base.post(`${this.props.storeId}/owner`, {
        data: uid,
      });
    }
    // Set state of inventory component to reflect current user
    this.setState({
      uid,
      owner: store.owner || uid,
    });
  };

  authenticate = (provider) => () => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(this.authHandler)
      .catch(() => alert("Login failed"));
  };

  logout = async () => {
    await firebase.auth().signOut();
    this.setState({
      uid: null,
      owner: null,
    });
  };

  render() {
    const logout = <button onClick={this.logout}>Log Out!</button>;

    if (!this.state.uid) {
      return <Login authenticate={this.authenticate} />;
    }

    if (this.state.uid !== this.state.owner) {
      return (
        <div>
          <p>Sorry, you are not the owner of this store.</p>
          {logout}
        </div>
      );
    }

    const fishes = this.props.fishes;
    return (
      <div className="inventory">
        <h2>Inventory!</h2>
        {logout}
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
