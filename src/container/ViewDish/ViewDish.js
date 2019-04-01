import React, { Component } from 'react';
import { Col } from 'react-bootstrap';
import './ViewDish.css';
import Sidebar from '../../component/Sidebar/Sidebar';
import DishInfo from '../../component/DishInfo/DishInfo';

class ViewDish extends Component {
  render() {
    return (
      <Col sm={12} className="ViewDish">
        <Sidebar model={this.props.model}/>
        <DishInfo dishId={this.props.match.params.dishId} model={this.props.model}/>
      </Col>
    );
  }
}

export default ViewDish;
