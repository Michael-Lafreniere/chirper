import React, { Component, Fragment } from 'react';

import ProfileImage from './ProfileImage';
import ChirpHeader from './Chirp/ChirpHeader';
import ChirpText from './Chirp/ChirpText';
import ChirpGallery from './Chirp/ChirpGallery';
import ChirpFooter from './Chirp/ChirpFooter';
import CreateChirp from './CreateChirp';

import { AppContext } from '../utils/AppContext';

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
      iReChirped: null,
      comments: this.props.data.num_replies,
      iCommented: null,
      stars: this.props.data.stars,
      iStared: this.props.data.sid,
      acct_verified: this.props.data.acct_verified,
      time: this.props.data.created_on
    };
  }

  render() {
    let containerClass = 'container';
    if (this.props.index + 1 === this.props.total)
      containerClass = 'container border-bottom';
    return (
      <ChirpContext.Provider
        value={{
          chirpID: this.state.chirpID,
          content: this.state.content,
          display_name: this.state.display_name,
          handle: this.state.handle,
          time: this.state.time,
          comments: this.state.comments,
          iCommented: this.state.iCommented,
          reChirps: this.state.num_rechirps,
          iReChirped: this.state.iReChirped,
          stars: this.state.stars,
          iStared: this.state.iStared,
          acct_verified: this.state.acct_verified,
          image1: this.state.image1,
          image2: this.state.image2,
          image3: this.state.image3,
          image4: this.state.image4
        }}
      >
        <section className="chirp">
          <div className={containerClass}>
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
        <AppContext.Consumer>
          {context => (
            <Fragment>
              {context.reply === this.state.chirpID ? (
                <CreateChirp placeholder="What are you thinking?" />
              ) : null}
            </Fragment>
          )}
        </AppContext.Consumer>
      </ChirpContext.Provider>
    );
  }
}

export default Chirp;
