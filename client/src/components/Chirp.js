import React, { Component } from 'react';

import './Chirp.css';

class Chirp extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="chirp">
        <article>
          <div className="chirp-header">
            <div className="chirp-header_icon">i</div>
            <div className="chirp-header_text">re-chirped</div>
          </div>
          <div className="chirp-body">
            <div className="chirp-body_left-side">
              <div className="chirp-body_user_image">
                <a href="http://localhost:3000/">
                  <img
                    src="https://via.placeholder.com/49"
                    alt="user supplied profile"
                  />
                </a>
              </div>
            </div>
            <div className="chirp-body_content">
              this is my chirp, there are many like it, but this one is mine.
            </div>
          </div>
        </article>
      </div>
    );
  }
}

export default Chirp;
