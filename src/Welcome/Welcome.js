import React, {Component} from 'react';
import {Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {modelInstance} from '../data/DinnerModel';
import bgImg from './backgroundimg.jpg';
import classes from './index.module.css';

class Welcome extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isHovered: false
        }
    }

    handleHover = () => {
        this.setState({
            isHovered: !this.state.isHovered
        })
    };

    render() {
        // const introStyle = this.state.isHovered ? classes.intro : classes.introHide;
        return (
            <Col sm={12} className="text-center">
                <img className={classes.backgroundImg} src={bgImg} alt="backgroundImg"/>
                <div className={classes.intro} onMouseEnter={this.handleHover}>
                    <i className={classes.Welcome}>
                        Find and share everyday cooking inspiration on FireCook. Discover recipes, cooks, videos, and
                        how-tos based on the food you love and the friends you follow...
                    </i>
                    <Link to="/search/main%20course/%20">
                        <button className={classes.btn} onClick={modelInstance.resetCache()}>Get Started</button>
                    </Link>
                </div>
            </Col>
        );
    }
}

export default Welcome;
