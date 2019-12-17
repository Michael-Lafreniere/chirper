import {createShortcode} from './Common';

export const scrapeFromChirp = (type, symbol, data) => {
    let index = data.indexOf(symbol);
    while (index >= 0) {
        let length = data.indexOf(' ', index);
        if (length === -1) {
        length = data.length - index;
        } else {
        length = length - index - 1;
        }
        let subString = data.substr(index + 1, length);
        let formattedString = createShortcode(type, subString);
        data = data.replace(symbol + subString, formattedString);
        index = data.indexOf(symbol, index + formattedString.length);
    }

    return data;
};