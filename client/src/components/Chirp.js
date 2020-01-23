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
      content: this.props.data.content,
      display_name: this.props.data.display_name,
      handle: this.props.data.handle,
      reply_to: this.props.data.reply_to,
      userImage: this.props.data.userImage,
      reChirps: this.props.data.reChirps,
      comments: this.props.data.comments,
      stars: this.props.data.stars,
      acct_verified: this.props.data.acct_verified,
      time: this.props.data.created_on
    };
  }

  render() {
    return (
      <ChirpContext.Provider
        value={{
          chirpID: this.state.cid,
          content: this.state.content,
          display_name: this.state.display_name,
          handle: this.state.handle,
          time: this.state.time,
          reChirps: this.state.num_rechirps,
          stars: this.state.stars,
          comments: this.state.num_replies,
          acct_verified: this.state.acct_verified
        }}
      >
        <section className="chirp">
          <div className="container">
            <div className="chirp-sidebar">
              <ProfileImage />
            </div>
            <div className="chirp-wrapper">
              <ChirpHeader />
              <article className="chirp-content">
                <main>
                  <ChirpText />
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
