import React, { Component } from 'react';

import './Header.css'

class Header extends Component {
    render() {
        return (
            <div className={"header"}>
                <h1> {this.props.title} </h1>
                <a href="/">Home</a>
                <a href="/about">About</a>
            </div>
        )
    }
}

export default Header;