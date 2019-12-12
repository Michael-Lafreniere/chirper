import React, { Component } from 'react';

import './Chirp.css';

class Chirp extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <section className="chirp">
        <div className="container">
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
                  <a href="http://localhost:3000/">User Name</a>
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
                <div className="dot">&middot;</div>
                <div className="post-time">20h</div>
              </div>
              <article className="chirp-content">
                <div className="text">
                  This is my chirp, there are many like it, but this one is
                  mine. This is a very long text test to see how it wraps and
                  stuff to see if we need to change anything @World #test
                </div>
                <div className="images">
                  <a href="http://localhost:3000/">
                    <img
                      src="https://via.placeholder.com/200"
                      alt="user supplied profile"
                    />
                  </a>
                  <a href="http://localhost:3000/">
                    <img
                      src="https://via.placeholder.com/200"
                      alt="user supplied profile"
                    />
                  </a>
                  <a href="http://localhost:3000/">
                    <img
                      src="https://via.placeholder.com/200"
                      alt="user supplied profile"
                    />
                  </a>
                </div>
              </article>
              <div className="chirp-footer">
                <button>
                  <img
                    src="https://via.placeholder.com/24"
                    alt="comment button"
                  />
                </button>
                <span className="num-comments">4</span>
                <button>
                  <img
                    src="https://via.placeholder.com/24"
                    alt="re-chirp button"
                  />
                </button>
                <span className="num-rechirps">2</span>
                <button>
                  <img
                    src="https://via.placeholder.com/24"
                    alt="like chirp button"
                  />
                </button>
                <span className="num-stars">31</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Chirp;
