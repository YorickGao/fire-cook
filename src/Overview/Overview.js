import React, { Component } from 'react';
import { Row, Col, Panel } from 'react-bootstrap';
import './Overview.css';
import { Link } from 'react-router-dom';

class Overview extends Component {
  constructor(props) {
    super(props);

    // we put on state the properties we want to use and modify in the component
    this.state = {
      numberOfGuests: this.props.model.getNumberOfGuests(),
      totalMenuPrice: this.props.model.getTotalMenuPrice(),
      selectedDishes: this.props.model.getSelectedDishes()
    };
  }

  render() {
    let dishInfos =
      this.state.selectedDishes.map((selectedDish) =>
        <Col sm={4}>
          <Panel>
            <Panel.Body>
              <div className="crop">
                <img src={selectedDish.image} alt=""/>
              </div>
            </Panel.Body>
            <Panel.Footer>
              {selectedDish.title}
            </Panel.Footer>
            <div className="OverviewPrice">
              {this.props.model.getPriceOfDish(selectedDish)} SEK
            </div>
          </Panel>
        </Col>
      )

    return (
      <Col sm={12} className="text-center Overview">
        <div className="OverviewHeader">
          <Link to="/search">
            <button className="btn btn-primary">Go Back And Edit Dinner</button>
          </Link>
        </div>

        <div className="container-fluid">
          <Col smPush xs={12} sm={4} className="text-center">
            <div className="OverviewSummary">
              <h3 className="dinnerConfirmText">Dinner confirmation</h3>
              <p>Dinner for {this.state.numberOfGuests} people.</p>
              <p>Total cost will be {this.state.totalMenuPrice} SEK.</p>
              <Link to="/printout">
                <button className="btn btn-primary">Print Full Recipe</button>
              </Link>
            </div>
          </Col>
          <Col xs={12} sm={8}>
            <Row className="results-panel">
              {dishInfos}
            </Row>
          </Col>

        </div>
      </Col>
    );
  }
}

export default Overview;
