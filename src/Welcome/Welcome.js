import React, {Component} from 'react';
import {Col} from 'react-bootstrap';
import './Welcome.css';
import {Link} from 'react-router-dom';
import {modelInstance} from '../data/DinnerModel'

class Welcome extends Component {
    render() {
        return (
            <Col sm={12} className="text-center">
                <p className="Welcome">
                    Find and share everyday cooking inspiration on FireCook. Discover recipes, cooks, videos, and
                    how-tos based on the food you love and the friends you follow.
                </p>
                <Link to="/search/main%20course/%20">
                    <button className="btn btn-primary" onClick={modelInstance.resetCache()}>Start planning</button>
                </Link>
            </Col>
        );
    }
}

export default Welcome;
