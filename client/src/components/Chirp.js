import React, { Component } from 'react';

import ChirpText from './Chirp/ChirpText';
import ChirpHeader from './Chirp/ChirpHeader';
import ChirpFooter from './Chirp/ChirpFooter';
import Image from './Image';

import './Chirp.css';

class Chirp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chirpText: this.props.data.chirpText,
      username: this.props.data.username,
      handle: this.props.data.handle,
      userImage: this.props.data.userImage,
      reChirp: this.props.data.reChirp
    };
  }

  render() {
    return (
      <section className="chirp">
        <div className="container">
          <div className="chirp-sidebar">
            <div className="user-image">
              <a href={`http://localhost:3000/${this.state.username}`}>
                <img src={this.state.userImage} alt="user supplied profile" />
              </a>
            </div>
          </div>
          <div className="chirp-wrapper">
            <ChirpHeader
              reChirp={this.state.reChirp}
              username={this.state.username}
              handle={this.state.handle}
              time="21h"
            />
            <article className="chirp-content">
              <main>
                <ChirpText text={this.state.chirpText} />
                <div className="gallary">
                  <Image imageURL="https://via.placeholder.com/1024" />
                  {/* <Image imageURL="https://via.placeholder.com/1024" /> */}
                  {/* <Image imageURL="https://via.placeholder.com/1024" /> */}
                  {/* <Image imageURL="https://via.placeholder.com/1024" /> */}
                </div>
              </main>
            </article>
            <ChirpFooter comments={20} reChirps={4} stars={89} />
          </div>
        </div>
      </section>
    );
  }
}

export default Chirp;
