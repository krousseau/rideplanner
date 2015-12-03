import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

const Ride = ({
  name,
  id,
  startDate
}) => (
  <li>
    <h4>{name}</h4>
    <section>
      {startDate}
      <Link to={`/rides/details/${id}`}>Details</Link>
    </section>
  </li>
);

Ride.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired
};

export default Ride;
