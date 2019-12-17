import React, { Component } from 'react';

import './Image.css';

class Image extends Component {
    render() {
        if (this.props.imageURL === undefined) return <></>;

        return (
        // <>
            <div className="image">
            <img
                src={this.props.imageURL}
                alt="user supplied"
            />
            </div>            
        // </>
        );
    }
}

export default Image;