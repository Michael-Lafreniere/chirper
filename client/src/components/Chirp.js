import React, { Component } from 'react';

import ChirpText from './Chirp/ChirpText';
import ChirpHeader from './Chirp/ChirpHeader';
import ChirpFooter from './Chirp/ChirpFooter';
import ProfileImage from './ProfileImage';
import Image from './Image';

import './Chirp.css';

export const ChirpContext = React.createContext();

class Chirp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chirpID: this.props.data.chirpID,
      chirpText: this.props.data.chirpText,
      username: this.props.data.username,
      handle: this.props.data.handle,
      userImage: this.props.data.userImage,
      reChirps: this.props.data.reChirps,
      comments: this.props.data.comments,
      stars: this.props.data.stars
    };
  }

  render() {
    return (
      <ChirpContext.Provider
        value={{
          chirpID: this.state.chirpID,
          reChirps: this.state.reChirps,
          stars: this.state.stars,
          comments: this.state.comments
        }}
      >
        <section className="chirp">
          <div className="container">
            <div className="chirp-sidebar">
              <ProfileImage />
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
                  <ChirpText text={this.state.content} />
                  <div className="gallary">
                    <Image imageURL="https://via.placeholder.com/1024" />
                    {/* <Image imageURL="https://via.placeholder.com/1024" /> */}
                    {/* <Image imageURL="https://via.placeholder.com/1024" /> */}
                    {/* <Image imageURL="https://via.placeholder.com/1024" /> */}
                  </div>
                </main>
              </article>
              <ChirpFooter />
            </div>
          </div>
        </section>
      </ChirpContext.Provider>
    );
  }
}

export default Chirp;
