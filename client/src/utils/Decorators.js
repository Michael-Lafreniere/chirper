import React, { Fragment } from 'react';

export const urlDecorator = (decoratedHref, decoratedText, classname, linkTarget = '') => {
    return (
        <a
        href={decoratedHref}
        target={linkTarget}
        className="chirp-link"
        >
        {decoratedText}
        </a>
    );
};
  
export const textDecorator = text => {
    return <>{text}</>;
};
  
export const decoratorWrapper = (decorator, key) => {
    return <Fragment key={key}>{decorator}</Fragment>;
};

//export default { urlDecorator, textDecorator, decoratorWrapper };