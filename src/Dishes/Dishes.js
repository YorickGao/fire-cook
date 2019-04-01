import React, {Component} from 'react';
import {Col, Row, FormGroup, FormControl, Button, Panel} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Dishes.css';
// Alternative to passing the model as the component property,
// we can import the model instance directly
import {modelInstance} from '../data/DinnerModel';

class Dishes extends Component {
  constructor(props) {
    super(props);
    // We create the state to store the various statuses
    // e.g. API data loading or error
    this.state = {
      status: 'INITIAL'
    };

    this.category = '';
    this.filter = '';
  }

  // this methods is called by React lifecycle when the
  // component is actually shown to the user (mounted to DOM)
  // that's a good place to call the API and get the data
  componentDidMount = () => this.getAllDishes();

  getAllDishes = (newCategory, newFilter) => {
    newCategory = newCategory || 'Main course';
    newFilter = newFilter || '';

    modelInstance.getAllDishes(newCategory, newFilter).then((dishes) => {
      this.setState({
        status: 'LOADED',
        dishes: dishes.results,
        baseUri: dishes.baseUri
      });
    }).catch(() => {
      this.setState({
        status: 'ERROR'
      });
    });
  };

  render() {
    let dishesList = null;

    // Depending on the state we either generate useful message to the user
    // or show the list of returned dishes.
    switch (this.state.status) {
      case 'INITIAL':
        dishesList = <div className="loader"></div>
        break;
      case 'LOADED':
        dishesList = this.state.dishes.map((dish) =>
          <Col sm={3} className="SearchResultsWrapper" key={dish.id}>
            <Link to={"/dish/" + dish.id}>
              <Panel className="SearchResults">
                <Panel.Body>
                  <div className="crop">
                    <img src={this.state.baseUri + dish.image} alt=""/>
                  </div>
                </Panel.Body>
                <Panel.Footer>
                  {dish.title}
                </Panel.Footer>
              </Panel>
            </Link>
          </Col>
        )
        break;
      default:
        dishesList = <b>Failed to load data, please try again.</b>
        break;
    }

    return (
      <Col sm={9} smOffset={3} className="Dishes" key="dishSearchKey">
        <div className="SearchForm">
          <h3>Find a dish</h3>
          <Row>
            <FormGroup className="FormGroup">
              <Col xs={12} sm={5} md={4} lg={3} className="FormField">
                <FormControl id="search-keywords" type="text" inputRef={ref => { this.filter = ref; }} placeholder="Enter key words"/>
              </Col>
              <Col xs={12} sm={5} md={4} lg={3} className="FormField">
                <FormControl id="search-category" inputRef={ref => { this.category = ref; }} componentClass="select">
                  <option>Main course</option>
                  <option>Side dish</option>
                  <option>Dessert</option>
                  <option>Appetizer</option>
                  <option>Salad</option>
                  <option>Bread</option>
                  <option>Breakfast</option>
                  <option>Soup</option>
                  <option>Beverage</option>
                  <option>Sauce</option>
                  <option>Drink</option>
                </FormControl>
              </Col>
              <Col xs={12} sm={2} md={4} lg={2} className="FormField">
                <Button onClick={() => this.getAllDishes(this.category.value, this.filter.value)} type="submit" className="btn btn-primary">Search</Button>
              </Col>
            </FormGroup>
          </Row>
        </div>
        <ul>
          {dishesList}
        </ul>
      </Col>
    );
  }
}

export default Dishes;
