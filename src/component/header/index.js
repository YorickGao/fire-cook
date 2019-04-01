import {Row} from "react-bootstrap";
import React from "react";
import {Link} from "react-router-dom";
import classes from './index.module.css';

export const Header = (props) => {
    return (
        <Row>
            <div className={classes.header}>
                <Link to="/">
                    <p className={classes.brand}>{props.title}</p>
                </Link>
            </div>
        </Row>
    )
};