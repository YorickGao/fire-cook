import React, { Component } from 'react';
import { Grid, Row } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.css';
import { Route } from 'react-router-dom';
import { modelInstance } from './tools/DinnerModel'
import Welcome from './Welcome/Welcome';
import SelectDish from './container/SelectDish/SelectDish';
import ViewDish from './container/ViewDish/ViewDish';
import Overview from './Overview/Overview';
import Printout from './Printout/Printout';
import {Header} from './component/header';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Grid fluid>
        <Header title="FIREBOOK"/>
        <Row>
          <Route exact path="/" component={Welcome}/>
          <Route path="/search/:category?/:filter?" render={(props) => <SelectDish {...props} model={modelInstance}/>}/>
          <Route path="/dish/:dishId" render={(props) => <ViewDish {...props} model={modelInstance}/>}/>
          <Route exact path="/overview" render={() => <Overview model={modelInstance}/>}/>
          <Route exact path="/printout" render={() => <Printout model={modelInstance}/>}/>
        </Row>
      </Grid>
    );
  }
}

export default App;
