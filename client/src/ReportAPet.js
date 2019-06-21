import React, { Component } from "react";
import { Form, Button, Col } from "react-bootstrap";

class ReportAPet extends Component {
  render() {
    return (
      <Form>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="name" placeholder="Enter name" />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridSpecies">
            <Form.Label>Species</Form.Label>
            <Form.Control as="select">
              <option>Enter a Species</option>
              <option>Cat</option>
              <option>Dog</option>
              <option>[̲̅$̲̅(̲̅2οο̲̅)̲̅$̲̅]</option>
              <option>__̴ı̴̴̡̡̡ ̡͌l̡̡̡ ̡͌l̡*̡̡ ̴̡ı̴̴̡ ̡̡͡|̲̲̲͡͡͡ ̲▫̲͡ ̲̲̲͡͡π̲̲͡͡ ̲̲͡▫̲̲͡͡ ̲|̡̡̡ ̡ ̴̡ı̴̡̡ ̡͌l̡̡̡̡.___</option>
              <option>(╭ರ_•́)</option>
              <option>( ^​_^）o自自o（^_​^ )</option>
            </Form.Control>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridBreed">
            <Form.Label>Breed</Form.Label>
            <Form.Control type="breed" placeholder="Enter Breed" />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} controlId="formGridStatus">
            <Form.Label>Status</Form.Label>
              <Form.Control as="select">
                <option>Status</option>
                <option>Lost</option>
                <option>Found</option>
                <option>Reunited</option>
              </Form.Control>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridStatus">
            <Form.Label>Gender</Form.Label>
              <Form.Control as="select">
                <option>Gender</option>
                <option>Male</option>
                <option>Female</option>
              </Form.Control>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridColoir">
            <Form.Label>Colour</Form.Label>
            <Form.Control type="name" placeholder="Colour" />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridDateLost">
            <Form.Label>Date Lost</Form.Label>
            <Form.Control type="name" placeholder="Date Lost" />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridLastSeen">
            <Form.Label>Last known location</Form.Label>
            <Form.Control placeholder="Last Seen"/>
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} controlId="formGridAdditionalComments">
            <Form.Label>Additional Comments</Form.Label>
            <Form.Control placeholder=""/>
          </Form.Group>
        </Form.Row>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    );
  }
}

export default ReportAPet;
