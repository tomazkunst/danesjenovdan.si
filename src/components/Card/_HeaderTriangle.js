import React, { PropTypes } from 'react';

const HeaderTriangle = ({ title }) => (
  <div className="card__header card__header--triangle">
    <h1 className="card__title">{title}</h1>
    <div className="triangle triangle--top" />
    <div className="triangle triangle--bottom" />
  </div>
);

HeaderTriangle.propTypes = {
  title: PropTypes.string,
};

export default HeaderTriangle;