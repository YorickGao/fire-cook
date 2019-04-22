import React, { Component } from 'react';
import { Col, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Sidebar.css';

class Sidebar extends Component {

  constructor(props) {
    super(props);

    // we put on state the properties we want to use and modify in the component
    this.state = {
      numberOfGuests: this.props.model.getNumberOfGuests(),
      selectedDishes: this.props.model.getSelectedDishes(),
      totalMenuPrice: this.props.model.getTotalMenuPrice()
    };
  }

  // this methods is called by React lifecycle when the
  // component is actually shown to the user (mounted to DOM)
  // that's a good place to setup model observer
  componentDidMount = () => this.props.model.addObserver(this);

  // this is called when component is removed from the DOM
  // good place to remove observer
  componentWillUnmount = () => this.props.model.removeObserver(this);

  // in our update function we modify the state which will
  // cause the component to re-render
  update() {
    this.setState({
      numberOfGuests: this.props.model.getNumberOfGuests(),
      selectedDishes: this.props.model.getSelectedDishes(),
      totalMenuPrice: this.props.model.getTotalMenuPrice()
    });
  }

  // our handler for the input's on change event
  onNumberOfGuestsChanged = (e) => this.props.model.setNumberOfGuests(+e.target.value);

  // increaseValue() {
  //   var value = parseInt(document.getElementById('totalNumberOfGuests').value, 10);
  //   value = isNaN(value) ? 0 : value;
  //   value++;
  //   document.getElementById('totalNumberOfGuests').value = value;
  // }
  //
  // decreaseValue() {
  //   var value = parseInt(document.getElementById('totalNumberOfGuests').value, 10);
  //   value = isNaN(value) ? 0 : value;
  //   value < 1 ? value = 1 : '';
  //   value--;
  //   document.getElementById('totalNumberOfGuests').value = value;
  // }

  render() {
    let selectedDishesTable =
      this.state.selectedDishes.map((selectedDish) =>
        <tr>
          <td>{selectedDish.title}</td>
          <td>{this.props.model.getPriceOfDish(selectedDish)}</td>
        </tr>
      )

    return (
    <Col sm={3} className="FauxContainer">
      <Col xsHidden sm={3} className="FauxSidebar"></Col>
      <Col sm={3} className="Sidebar">
        <Navbar>
          <Navbar.Header>
            <Navbar.Toggle/>
          </Navbar.Header>
          <Navbar.Collapse>
            <Col xsHidden className="hiddenPaddingFix"></Col>
            <h3>My dinner</h3>
            <div>
              People: <input value={this.state.numberOfGuests} onChange={this.onNumberOfGuestsChanged}/>
              <br/>Total number of guests: {this.state.numberOfGuests}
            </div>
            <hr/>
            <div>
            <table className="sidebarSelected">
              <thead>
                <tr className="hide-hr">
                  <th>Dish Name</th>
                  <th>Cost</th>
                </tr>
              </thead>
              <tbody>
                {selectedDishesTable}
              </tbody>
            </table>
            <div className="sidebarTotalCost">
              {this.state.totalMenuPrice}
            </div>
            </div>
            <hr/>
            <center>
              <Link to="/overview">
                <button className="btn btn-primary">Confirm dinner</button>
              </Link>
            </center>
          </Navbar.Collapse>
        </Navbar>
      </Col>
    </Col>
    );
  }
}

// <form>
//   Number of guests:
//   <div className="value-button" id="decrease" onClick={this.decreaseValue, this.onNumberOfGuestsChanged} value="Decrease Value">-</div>
//   <input id="totalNumberOfGuests" value={this.state.numberOfGuests} onChange={this.onNumberOfGuestsChanged}/>
//   <div className="value-button" id="increase" onClick={this.increaseValue, this.onNumberOfGuestsChanged} value="Increase Value">+</div>
// </form>

export default Sidebar;
