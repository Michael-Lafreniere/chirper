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
          <div className="chirp-sidebar">
            <div className="user-image">
              <a href="http://localhost:3000/">
                <img
                  src="https://via.placeholder.com/49"
                  alt="user supplied profile"
                />
              </a>
            </div>
          </div>
          <div className="chirp-wrapper">
            <div className="chirp-header">
              <div className="header-icon">
                <img src="https://via.placeholder.com/24" alt="some mark" />
              </div>
              <div className="header-text">re-chirped</div>
            </div>
            <div className="chirp-body">
              <div className="user-info">
                <div className="user-name">
                  <a href="http://localhost:3000/">Their Name</a>
                </div>
                <div className="user-verified">
                  <img
                    src="https://via.placeholder.com/24"
                    alt="verified checkmark"
                  />
                </div>
                <div className="user-handle">
                  <a href="http://localhost:3000/">@CoolHandle</a>
                </div>
                <div className="post-time">
                  <a href="http://localhost:3000/">20h</a>
                </div>
              </div>
              <div className="chirp-content">
                <div className="text">
                  This is my chirp, there are many like it, but this one is
                  mine. @World #test
                </div>
                <div className="images"></div>
              </div>
              <button>
                comment<span className="num-comments">4</span>
              </button>
              <button>
                re-chirp<span className="num-rechirps">2</span>
              </button>
              <button>
                star<span className="num-stars">31</span>
              </button>
            </div>
          </div>
        </article>
      </div>
    );
  }
}

export default Chirp;
