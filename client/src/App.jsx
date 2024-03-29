import axios from "axios";
import React, { Component } from "react";
import "./App.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";

class App extends Component {
  state = { users: [], pets: [] };

  componentDidMount() {
    axios
      .get("http://localhost:3001/api/pets.json")
      .then(response => {
        console.log(response);
        this.setState({
          pets: response.data
        });
      })
      .catch(error => console.log(error));

    axios
      .get("http://localhost:3001/api/users.json")
      .then(response => {
        console.log(response);
        this.setState({
          users: response.data
        });
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div className="App">
        <h1>Users</h1>
        <AwesomeButton type="primary">Button</AwesomeButton>
        {this.state.users.map(user => (
          <div key={user.id}>{user.name}</div>
        ))}
        <h1>Pets</h1>
        {this.state.pets.map(pet => (
          <div key={pet.id}>{pet.name}</div>
        ))}
      </div>
    );
  }
}

export default App;
