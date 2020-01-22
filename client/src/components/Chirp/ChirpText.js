import React, { Component } from 'react';
import {
  urlDecorator,
  textDecorator,
  decoratorWrapper
} from '../../utils/Decorators';
import { scrapeFromChirp } from '../../utils/Scrappers';

class ChirpText extends Component {
  splitMessage = content => {
    if (content !== undefined) {
      const SPLIT_SHORTCODES_REGEX = /([^[\]]|\[\])+/g;
      content = content.match(SPLIT_SHORTCODES_REGEX);
    }
    return content;
  };

  parseChirp = chirp => {
    let data = scrapeFromChirp('AT', '@', chirp);
    data = scrapeFromChirp('TREND', '#', data);
    let content = this.splitMessage(data);
    return content;
  };

  formatChirp = chirp => {
    const data = this.parseChirp(chirp);

    if (data !== undefined) {
      return data.map((item, i) => {
        if (item.match('AT')) {
          const index = item.indexOf(':');
          const what = item.slice(index + 1);
          const handle = `@${what}`;
          const url = `http://localhost:3000/${what}`;
          return decoratorWrapper(urlDecorator(url, handle), i);
        } else if (item.match('TREND')) {
          const index = item.indexOf(':');
          const what = item.slice(index + 1);
          const trend = `#${what}`;
          const url = `http://localhost:3000/chirptag/${what}`;
          return decoratorWrapper(urlDecorator(url, trend), i);
        }
        return decoratorWrapper(textDecorator(item), i);
      });
    }
    return chirp;
  };

  render() {
    return (
      <div className="text">
        <React.Fragment>{this.formatChirp(this.props.text)}</React.Fragment>
      </div>
    );
  }
}

export default ChirpText;
