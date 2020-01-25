import React, { Component } from 'react';

import ChirpText from './Chirp/ChirpText';
import ChirpHeader from './Chirp/ChirpHeader';
import ChirpFooter from './Chirp/ChirpFooter';
import ChirpGallery from './Chirp/ChirpGallery';
import ProfileImage from './ProfileImage';

import './Chirp.css';

export const ChirpContext = React.createContext();

class Chirp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      creator_id: this.props.data.uid,
      chirpID: this.props.data.cid,
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
          chirpID: this.state.chirpID,
          content: this.state.content,
          display_name: this.state.display_name,
          handle: this.state.handle,
          time: this.state.time,
          reChirps: this.state.num_rechirps,
          stars: this.state.stars,
          comments: this.state.num_replies,
          acct_verified: this.state.acct_verified,
          image1: this.state.image1,
          image2: this.state.image2,
          image3: this.state.image3,
          image4: this.state.image4
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
                  <ChirpGallery />
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
