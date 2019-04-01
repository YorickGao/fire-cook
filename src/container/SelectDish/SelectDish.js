import React, { Component } from 'react';
import { Col } from 'react-bootstrap';
import Sidebar from '../../component/Sidebar/Sidebar';
import Dishes from '../../component/Dishes/Dishes';
import classes from './index.module.css';

class SelectDish extends Component {
  render() {
    return (
      <Col sm={12} className={classes.SelectDish}>
        <Sidebar model={this.props.model}/>
        <Dishes category={this.props.match.params.category} filter={this.props.match.params.filter}/>
      </Col>
    );
  }
}

export default SelectDish;
