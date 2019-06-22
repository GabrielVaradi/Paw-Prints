import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import TimeAgo from 'react-timeago';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

class PetProfile extends Component {

    getPet() {       
        const id = Number(this.props.match.params.id);
        const pets = this.props.pets;
        const [pet] = pets.filter(pet => pet.id === id);
        return pet;
    } 

    render() {
        const pet = this.getPet();
        const latitude = Number(pet.address.latitude);
        const longitude = Number(pet.address.longitude);
        const mapStyles = {
            width: '60vw',
            height: '200px'
          };
        return (
            <Card key="{pet.id}">
            <Card.Header>{pet.name}</Card.Header>
            <Card.Img variant="top" src={pet.picture} />
            <Card.Body>
              <Card.Title>{pet.name}, a {pet.status} {pet.species} in {pet.address.city}, {pet.address.postal_code}</Card.Title>
              <Card.Title className="StatusIcon">{pet.status}</Card.Title>
              <Card.Text>
                <p>Breed: {pet.description.breed}</p>
                <p>Colour: {pet.description.colour}</p>
                <p>Sex: {pet.description.sex}</p>
                <p>{pet.status} <TimeAgo date={pet.date_lost}/></p>
                <p>Additional description: {pet.description.additional}</p>
              </Card.Text>
              <hr></hr>
              <Card.Text>
                  <p>{pet.name} was {pet.status.toLowerCase()} near {pet.address.street_name}, {pet.address.city}</p>
              </Card.Text>
              <div className="PetMap">
              <Map
                google={this.props.google}
                zoom={10}
                initialCenter={{
                lat: latitude,
                lng: longitude
                }}
                style={mapStyles}>
                < Marker/>
                </Map>
                </div>
              <hr></hr>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
      );
    }
};

export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_API_KEY
  })(PetProfile);