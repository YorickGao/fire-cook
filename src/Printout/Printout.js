import React, { Component } from 'react';
import { Col, Panel } from 'react-bootstrap';
import './Printout.css';
import { Link } from 'react-router-dom';

class Printout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      numberOfGuests: this.props.model.getNumberOfGuests(),
      selectedDishes: this.props.model.getSelectedDishes()
    };
  }

  render() {
    const DESCRIPTION = "\
        Lorem ipsum dolor sit amet, consectetur adipiscing elit,\
        sed do eiusmod tempor incididunt ut labore et dolore\
        magna aliqua. Ut enim ad minim veniam, quis nostrud\
        exercitation ullamco laboris nisi ut aliquip ex ea\
        commodo consequat. Duis aute irure dolor in\
        reprehenderit in voluptate velit esse cillum dolore eu\
        fugiat nulla pariatur. Excepteur sint occaecat cupidatat\
        non proident, sunt in culpa qui officia deserunt mollit\
        anim id est laborum.";

    let dishPrepInfo =
      this.state.selectedDishes.map((selectedDish) =>
        <Panel>
          <Panel.Body>
            <Col sm={2} className="crop">
              <img src={selectedDish.image} alt=""/>
            </Col>
            <Col sm ={4}>
              <h3>{selectedDish.title}</h3>
              <p>{DESCRIPTION}</p>
            </Col>
            <Col sm={6}>
              <h3>Preparation</h3>
              {selectedDish.instructions}
            </Col>
          </Panel.Body>
        </Panel>
      )

    return (
      <Col sm={12} className="Printout">
        <Panel>
          <Panel.Body>
            <Col sm={2}>
            <Link to="/search">
              <button className="btn btn-primary">Go Back And Edit Dinner</button>
            </Link>
            </Col>
            <Col sm={10}>
              <h3 className="pull-right">Dinner for {this.state.numberOfGuests} people</h3>
            </Col>
          </Panel.Body>
        </Panel>

        {dishPrepInfo}
      </Col>
    );
  }
}

export default Printout;
